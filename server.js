const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port : conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer'); 
// const upload = multer({dest: './upload'}) // 확장자 문제로 아래 처럼 설정 추가 

const upload = multer({
  storage: multer.diskStorage({ // 폴더에 파일 업로드 설정
    destination: function (req, file, cb) { // 경로 설정
      cb(null, './upload');
    },
    filename: function (req, file, cb) { // 파일 이름 설정 타임스탬프+path.extname을 사용하여 확장자명을 붙여서 업로드
      cb(null, new Date().valueOf() + path.extname(file.originalname)); // 타임스탬프+확장자명으로 파일 업로드
    }
  }),
});

app.get('/api/customers', (req,res) => { 
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0", (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use('/image',express.static('./upload')); // 사용자가 image라는 가상경로에 접근했을 때 실제 서버는 upload폴더를 매핑 

app.post('/api/customers', upload.single('image'), (req, res) => { // DB 저장 과정 
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?,now(), 0)';
  const ext = path.extname(req.file.originalname); 
  let image = '/image/' + req.file.filename; //기본설정으로 multer라이브러리가 겹치지 않는 이름으로 저장하지만 100%는 아닌듯하다. 위에서 multer설정에서 타임스태프를 이용하여 변경한 셋팅값이 적용되어 업로드파일과 동일한 이름을 같게된다.  
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job]; // db에 전송할 데이터 (? , ? 순서대로)
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.delete('/api/customers/:id', (req,res)=> {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?'; // db상에 삭제완료를 의미하는 값으로 isDeleted를 1로 변경
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields)=> {
    res.send(rows);
  })
});


app.listen(port, () => console.log(`Listening on port ${port}`)); // 숫자1 옆 ` 사용해야 안에 변수 출력가능 