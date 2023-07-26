import './App.css';
import Header from "./Components/header";
import BodyContent from "./Components/bodyContent";

function App() {
  console.log('Rendering app...')
  return (
    <div className="App">
      <Header/>
      <BodyContent/>
    </div>
  );
}

export default App;
