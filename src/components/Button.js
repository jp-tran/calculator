import React from 'react';
import './Button.css';
// import { RiDeleteBack2Line as DeleteIcon } from 'react-icons/ri';
// import { FaPlus, FaMinus, FaTimes, FaDivide, FaEquals } from 'react-icons/fa';

const Button = ({ text, onClick }) => {
  // set button color
  let color = '#070708';
  if (isNaN(text)) {
    color = '#212224';
  }

  // change symbol if necessary
  // const text2symbol = {
  //   DEL: <DeleteIcon style={{ zIndex: '-10' }} />,
  //   '+': <FaPlus style={{ zIndex: '-10' }} />,
  //   '-': <FaMinus style={{ zIndex: '-10' }} />,
  //   x: String.fromCharCode('&#xd7;'),
  //   '/': <FaDivide style={{ zIndex: '-10' }} />,
  //   '=': <FaEquals style={{ zIndex: '-10' }} />,
  // };
  // let symbol = text;
  // if (text2symbol.hasOwnProperty(text)) {
  //   symbol = text2symbol[text];
  // }

  return (
    <button
      className='button'
      style={{ backgroundColor: color }}
      onClick={onClick}
      type='button'
      value={text}
    >
      {text}
    </button>
  );
};

export default Button;
