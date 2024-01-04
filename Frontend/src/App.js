import './App.css';
import Header from "./Components/header";
import BodyContent from "./Components/bodyContent";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';


function App() {
    const outerTheme = createTheme({
        palette: {
          primary: {
            main: orange[500],
          },
        },
      });
  const navigate = useNavigate();
//   useEffect(() => {
//     if(!localStorage.getItem('token')) {
//       navigate('/login')
//     } 
// })

  return (
    <ThemeProvider theme={outerTheme}>
    <div className="App">
      {/* <Header/> */}
      <BodyContent/>
    </div>
    </ThemeProvider>
  );
}

export default App;
