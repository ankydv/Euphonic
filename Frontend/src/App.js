import './App.css';
import Header from "./Components/header";
import BodyContent from "./Components/bodyContent";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { lightTheme } from './theme';


function App() {

  return (
    <ThemeProvider theme={lightTheme}>
    <div className="App">
      {/* <Header/> */}
      <BodyContent/>
    </div>
    </ThemeProvider>
  );
}

export default App;
