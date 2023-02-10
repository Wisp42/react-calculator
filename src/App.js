import React, { useEffect, useState } from 'react';
import './style.css';

let buffer = '';
let nums_stack = [];
let actions_stack = [];

function CalcButton(props) {
  function testFunc(e) {
    e.preventDefault();
    props.enter(props.btn_value, props.btn_type, props.action_func);
  }

  return (
    <div>
      <input type="submit" value={props.btn_value} onClick={testFunc} />
    </div>
  );
}

function App() {
  let output = '0';
  const [value, setValue] = useState(output);

  function Summer(num1, num2) {
    return num1 + num2;
  }
  function Result() {
    for (let i = 0; i < actions_stack.length; i += 1) {
      nums_stack[i + 1] = actions_stack[i](nums_stack[i], nums_stack[i + 1]);
    }
    buffer = nums_stack[nums_stack.length - 1];
    nums_stack = [];
    actions_stack = [];
    nums_stack.push(buffer);
    buffer = '';
  }

  function enterNumber(symbol, type, action) {
    setValue(value + symbol);
    buffer += symbol;

    if (type == 'action') {
      nums_stack.push(parseInt(buffer));
      actions_stack.push(action);
      buffer = '';
    } else if (type == 'result') {
      nums_stack.push(parseInt(buffer));
      Result();
      setValue(nums_stack[0]);
    }
  }

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>{value}</p>
      <CalcButton btn_value={1} enter={enterNumber} btn_type={'digit'} />
      <CalcButton btn_value={2} enter={enterNumber} btn_type={'digit'} />
      <CalcButton btn_value={3} enter={enterNumber} btn_type={'digit'} />
      <CalcButton btn_value={4} enter={enterNumber} btn_type={'digit'} />
      <CalcButton btn_value={5} enter={enterNumber} btn_type={'digit'} />
      <CalcButton btn_value={6} enter={enterNumber} btn_type={'digit'} />
      <CalcButton btn_value={7} enter={enterNumber} btn_type={'digit'} />
      <CalcButton btn_value={8} enter={enterNumber} btn_type={'digit'} />
      <CalcButton btn_value={9} enter={enterNumber} btn_type={'digit'} />
      <CalcButton btn_value={0} enter={enterNumber} btn_type={'digit'} />
      <CalcButton
        btn_value={'+'}
        enter={enterNumber}
        btn_type={'action'}
        action_func={Summer}
      />
      <CalcButton btn_value={'='} enter={enterNumber} btn_type={'result'} />
    </div>
  );
}

export default App;
