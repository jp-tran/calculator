import './App.css';
import Display from './components/Display';
import Keypad from './components/Keypad';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>Calculator</header>
      <div className='container'>
        <Display />
        <Keypad />
      </div>
    </div>
  );
}

export default App;
