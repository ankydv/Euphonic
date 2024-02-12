import './App.css';
import BodyContent from "./Components/bodyContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './theme';
import { useSelector } from 'react-redux';


function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
    <div className="App">
      <BodyContent/>
    </div>
    </ThemeProvider>
  );
}

export default App;
