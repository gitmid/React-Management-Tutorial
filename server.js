const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([{
        'id':1,
        'image':'https://placeimg.com/64/64/1',
        'name': '홍길동',
        'birthday': '961222',
        'gender':'남자',
        'job':'대학생'
      },{
        'id':2,
        'image':'https://placeimg.com/64/64/2',
        'name': '홍2동',
        'birthday': '810102',
        'gender':'여자',
        'job':'개발자'
      },{
        'id':3,
        'image':'https://placeimg.com/64/64/3',
        'name': '홍3동',
        'birthday': '900211',
        'gender':'남자',
        'job':'미용사'
      }]);
});

app.listen(port, () => console.log(`Listening on port ${port}`)); // 숫자1 옆 ` 사용해야 안에 변수 출력가능 