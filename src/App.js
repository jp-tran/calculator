import { useState, useEffect } from 'react';
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

function isMultDiv(str) {
  return str === 'x' || str === '/';
}

function isSign(str) {
  return (
    str === 'x' || str === '/' || str === '+' || str === '-' || str === '%'
  );
}

function solve(num1, op, num2) {
  switch (op) {
    case 'x':
      return parseFloat(num1) * parseFloat(num2);
    case '/':
      return parseFloat(num1) / parseFloat(num2);
    case '+':
      return parseFloat(num1) + parseFloat(num2);
    case '-':
      return parseFloat(num1) - parseFloat(num2);
    case '%':
      return parseFloat(num1) % parseFloat(num2);
    default:
      break;
  }
}
// _ 22 _ _ _ - 1 = 21
function evaluate(expr) {
  let firstRun = true;
  let numIdx;
  let opIdx;
  for (let k = 0; k < 2; k++) {
    numIdx = null;
    opIdx = null;
    for (let i = 0; i < expr.length; i++) {
      const term = expr[i];
      if (term === null) {
        continue;
      } else if (isSign(term)) {
        if ((firstRun && isMultDiv(term)) || !firstRun) {
          opIdx = i;
        }
      } else {
        if (numIdx !== null && opIdx !== null) {
          expr[opIdx] = solve(expr[numIdx], expr[opIdx], expr[i]);
          expr[numIdx] = null;
          expr[i] = null;
          numIdx = opIdx;
          opIdx = null;
        } else {
          numIdx = i;
        }
      }
    }
    firstRun = !firstRun;
  }

  return [expr[numIdx].toString()];
}

function App() {
  const [expr, setExpr] = useState([]);

  const handleClick = (val) => {
    // const val = e.target.value;
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
      copy[copy.length - 1] = isNumeric(newNum) ? newNum : oldNum;
    }

    // special functions: = DEL C CE
    else if (val === 'DEL') {
      const num = copy[copy.length - 1];
      if (num.length === 1) {
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

    // evaluate expression
    if (val === '=' && !isSign(copy[copy.length - 1])) {
      copy = evaluate(expr);
    }
    setExpr(copy);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    let val;

    if (isNumeric(key) || isSign(key) || key === '.' || key === '=') {
      val = key;
    } else if (key.toUpperCase() === 'C') {
      val = 'C';
    } else if (key === 'Backspace') {
      val = 'DEL';
    } else if (key === 'Enter') {
      val = '=';
    }

    if (val !== undefined) {
      handleClick(val);
    }
  };

  useEffect(() => {
    // need useEffect for window event listener to work
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className='App'>
      <header className='App-header'>Calculator</header>
      <div className='container'>
        <Display expr={expr} />
        <Keypad onClick={(e) => handleClick(e.target.value)} />
      </div>
    </div>
  );
}

export default App;
