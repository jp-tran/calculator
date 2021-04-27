import './Keypad.css';
import React, { Component } from 'react';
import Button from './Button';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { FaPlus, FaMinus, FaTimes, FaDivide, FaEquals } from 'react-icons/fa';

export default class Keypad extends Component {
  contents = [
    '%',
    'CE',
    'C',
    <RiDeleteBack2Line />,
    '7',
    '8',
    '9',
    <FaDivide />,
    '4',
    '5',
    '6',
    <FaTimes />,
    '1',
    '2',
    '3',
    <FaMinus />,
    '.',
    '0',
    <FaEquals />,
    <FaPlus />,
  ];

  render() {
    return (
      <div className='keypad'>
        {this.contents.map((content) => (
          <Button text={content} />
        ))}
      </div>
    );
  }
}
