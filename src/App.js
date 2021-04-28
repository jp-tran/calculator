import { useState } from 'react';
import './App.css';
import Display from './components/Display';
import Keypad from './components/Keypad';

function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

function isSign(str) {
  return str === 'x' || str === '/' || str === '+' || str === '-';
}

function App() {
  const [expr, setExpr] = useState(['4', 'x', '3', '3']);

  const handleClick = (e) => {
    const val = e.target.value;
    let copy = expr.slice();

    // handle initial input
    if (copy.length === 0) {
      if (isNumeric(val) || val === '.') {
        copy.push(val);
        setExpr(copy);
      }
      return;
    }

    // digits
    if (
      (isNumeric(copy[copy.length - 1]) || copy[copy.length - 1] === '.') &&
      (isNumeric(val) || val === '.')
    ) {
      const oldNum = copy[copy.length - 1];
      const newNum = oldNum + val;
      // console.log(oldNum);
      // console.log(newNum);
      copy[copy.length - 1] = isNumeric(newNum) ? newNum : oldNum;
    }

    // special functions: = DEL C CE
    else if (val === 'DEL') {
      const num = copy[copy.length - 1];
      if (num.length == 1) {
        copy.pop();
      } else {
        copy[copy.length - 1] = num.slice(0, -1);
      }
    } else if (val === 'C') {
      copy = [];
    } else if (val === 'CE') {
      copy.pop();
    }

    // sign: + - x / %
    else {
      if (isSign(copy[copy.length - 1]) && isSign(val)) {
        copy[copy.length - 1] = val;
      } else {
        copy.push(val);
      }
    }

    setExpr(copy);
  };

  return (
    <div className='App'>
      <header className='App-header'>Calculator</header>
      <div className='container'>
        <Display expr={expr} />
        <Keypad onClick={(e) => handleClick(e)} />
      </div>
    </div>
  );
}

export default App;
