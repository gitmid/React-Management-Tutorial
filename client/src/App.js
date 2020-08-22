import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer'
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { async } from 'rxjs';


const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX:'auto'
  },
  table : {
    minWidth : 1080
  },
  progress: {
    margin : theme.spacing.unit * 2
  }
})

/*

1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

*/

/*

props or state => shouldComponentUpdate()

*/

class App extends Component {

  state = {
    customers:"",
    completed : 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20); // progress 함수 0.2초마다 실행 프로그레스 바 테스트는 아래 callApi호출하는 부분을 주석처리 
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () =>
 {
   const { completed } = this.state; // state 변수(completed) 또는 props는 {} 로 감싸줌 , 번외로 jsx문법안에 표현식 사용에도 {}로 감싸줌
   this.setState({ completed: completed >= 100 ? 0 : completed + 1});
 }

  render() {
    const { classes} = this.props;
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
      {this.state.customers ? this.state.customers.map(c => { return ( <Customer   key={c.id} id={c.id}  image={c.image}  name={c.name}  birthday={c.birthday}  gender={c.gender} job={c.job} /> );})
      : <TableRow>
      <TableCell colSpan="6" align="center">
        <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
      </TableCell>
    </TableRow>
    }
      
            </TableBody>
            </Table>
    
      </Paper>
      );
    }
  }

export default withStyles(styles)(App);
 