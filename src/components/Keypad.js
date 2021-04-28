import './Keypad.css';
import React, { Component } from 'react';
import Button from './Button';

export default class Keypad extends Component {
  contents = [
    '%',
    'CE',
    'C',
    'DEL',
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    'x',
    '1',
    '2',
    '3',
    '-',
    '.',
    '0',
    '=',
    '+',
  ];

  render() {
    console.log(this.onClick);
    return (
      <div className='keypad'>
        {this.contents.map((content) => (
          <Button text={content} onClick={this.props.onClick} />
        ))}
      </div>
    );
  }
}
