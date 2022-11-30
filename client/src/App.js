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

export default App;