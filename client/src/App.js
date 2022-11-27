import './App.css';
import { DateComponent } from './components/DateComponent';
import { Header } from './components/Header';

const person ={
  "name" : "John Doe"
}
function App() {
  return (
    <div className="App">
      <Header title={"Suggested Date"}/>
      <DateComponent person ={person} />
    </div>
  );
}

export default App;
