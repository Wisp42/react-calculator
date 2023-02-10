import React, { useEffect, useState } from 'react';
import './style.css';

// глобальные переменные:
let buffer = '';
let output = '';
let nums_stack = [];
let actions_stack = [];

function CalcButton(props) {
  function pressButton(e) {
    e.preventDefault();
    props.reader(props.btn_value, props.btn_type, props.action_func);
  }

  return (
    <div>
      <input type="submit" value={props.btn_value} onClick={pressButton} />
    </div>
  );
}

function App() {
  const [value, setValue] = useState('0');

  function readAction(symbol, type, action) {
    output += symbol;
    setValue(output);
    buffer += symbol;

    if (type == 'action') {
      nums_stack.push(parseFloat(buffer));
      actions_stack.push(action);
      buffer = '';
    } else if (type == 'result') {
      nums_stack.push(parseFloat(buffer));
      Result();
      setValue(buffer);
    }
  }

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>{value}</p>
      <CalcButton btn_value={1} reader={readAction} btn_type={'digit'} />
      <CalcButton btn_value={2} reader={readAction} btn_type={'digit'} />
      <CalcButton btn_value={3} reader={readAction} btn_type={'digit'} />
      <CalcButton btn_value={4} reader={readAction} btn_type={'digit'} />
      <CalcButton btn_value={5} reader={readAction} btn_type={'digit'} />
      <CalcButton btn_value={6} reader={readAction} btn_type={'digit'} />
      <CalcButton btn_value={7} reader={readAction} btn_type={'digit'} />
      <CalcButton btn_value={8} reader={readAction} btn_type={'digit'} />
      <CalcButton btn_value={9} reader={readAction} btn_type={'digit'} />
      <CalcButton btn_value={0} reader={readAction} btn_type={'digit'} />
      <CalcButton
        btn_value={'+'}
        reader={readAction}
        btn_type={'action'}
        action_func={addNums}
      />
      <CalcButton
        btn_value={'-'}
        reader={readAction}
        btn_type={'action'}
        action_func={substractNums}
      />
      <CalcButton
        btn_value={'*'}
        reader={readAction}
        btn_type={'action'}
        action_func={multiplyNums}
      />
      <CalcButton
        btn_value={'/'}
        reader={readAction}
        btn_type={'action'}
        action_func={divisionNums}
      />
      <CalcButton btn_value={'='} reader={readAction} btn_type={'result'} />
    </div>
  );

  // функции для действий:
  function addNums(num1, num2) {
    return num1 + num2;
  }
  function substractNums(num1, num2) {
    return num1 - num2;
  }
  function multiplyNums(num1, num2) {
    return num1 * num2;
  }
  function divisionNums(num1, num2) {
    return num1 / num2;
  }

  function Result() {
    for (let i = 0; i < actions_stack.length; i += 1) {
      nums_stack[i + 1] = actions_stack[i](nums_stack[i], nums_stack[i + 1]);
    }
    buffer = nums_stack[nums_stack.length - 1].toString();
    output = buffer;
    nums_stack = [];
    actions_stack = [];
    console.log(nums_stack);
    console.log(actions_stack);
    console.log(buffer);
  }
}

export default App;
