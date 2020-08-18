const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
});

app.listen(port, () => console.log(`Listening on port ${port}`)); // 숫자1 옆 ` 사용해야 안에 변수 출력가능 