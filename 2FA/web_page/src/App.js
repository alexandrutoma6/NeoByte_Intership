import React , {useState} from 'react';
//import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Validation } from "./Validation";


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) =>{
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      {
        //switch between login and validation page
        currentForm === 'login' ? <Login onFormSwitch = {toggleForm}/> : <Validation onFormSwitch = {toggleForm}/>
      }
    </div>
  );
}
export default App;
