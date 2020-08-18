import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer'

const customers = [{
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
}]

class App extends Component {
  render() {
  return (
    customers.map(c => {
      return (
      <Customer 
        key={c.id}
        id={c.id}
        image={c.image}
        name={c.name}
        birthday={c.birthday}
        gender={c.gender}
        job={c.job}
      />
      );
    })
  );
  }
}

export default App;
 