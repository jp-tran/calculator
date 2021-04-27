import React from 'react';
import './Button.css';

const Button = ({ text }) => {
  let color = '#070708';
  if (isNaN(text)) {
    color = '#212224';
  }

  return (
    <button className='button' style={{ backgroundColor: color }}>
      {text}
    </button>
  );
};

export default Button;
