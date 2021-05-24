import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import DisplayChart from './components/DisplayChart';
import { GlobalContext } from './components/DataSource/GlobalState';

function App() {


  return (
    <GlobalContext>
      <Header/>
      <Home/>
    </GlobalContext>
  );
}

export default App;
