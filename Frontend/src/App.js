import './App.css';
import BodyContent from "./Components/bodyContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './theme';
import { useSelector } from 'react-redux';


function App() {
  const themeMode = useSelector((state) => state.theme);
  return (
    <ThemeProvider theme={Theme({mode: themeMode})}>
    <div className="App">
      <BodyContent/>
    </div>
    </ThemeProvider>
  );
}

export default App;
