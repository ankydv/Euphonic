import './App.css';
import Header from "./Components/header";
import BodyContent from "./Components/bodyContent";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const navigate = useNavigate();
//   useEffect(() => {
//     if(!localStorage.getItem('token')) {
//       navigate('/login')
//     } 
// })

  return (
    <div className="App">
      <Header/>
      <BodyContent/>
    </div>
  );
}

export default App;
