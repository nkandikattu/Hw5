import './App.css';
import { DateComponent } from './components/DateComponent';
import { Header } from './components/Header';
import SignUp from './components/SignUp'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login'

const person ={
  "name" : "John Doe"
}
function App() {
  if(window.self === window.top){
    return (
      <Router>
        <Routes>
          <Route path='/' element={
            <div className="App">
            <Header title={"Suggested Date"}/>
            <DateComponent person ={person} />
          </div>
          }></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Router>
    );
  }
  else{
    return (
      <Router>
        <Routes>
          <Route path='/login-vulnerable' element={<Login />}></Route>
          <Route path="*" element={
            <h1>Insecure Request</h1>
          }></Route> 
        </Routes>
      </Router>
    )
  }
  
}

export default App;