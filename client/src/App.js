import './App.css';
import { DateComponent } from './components/DateComponent';
import { Header } from './components/Header';
import SignUp from './components/SignUp'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import LoginVulnerable from './components/LoginVulnerable';
import { NoMatch } from './components/NoMatch';


function App() {
    return (
      <Router>
        <Routes>
        <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/refineDate' element={<DateComponent />}></Route>
        <Route path='/noMatch' element={<NoMatch />}></Route>
        <Route path='/login-vulnerable' element={<LoginVulnerable />}></Route>
      </Routes>
      </Router>
    );
  
}

export default App;