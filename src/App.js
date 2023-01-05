import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Content from './Content';


function App() {

  return (

    <Router>
      <div className="App">
          <Header logo="Logo" />
          <Content />
      </div>
    </Router>
  );
}

export default App;
