import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { Home } from "./my components/Home"; //for rafc

function App() {
  return (
    <div>
      <Home/>
    </div>
  );
}

export default App;
