import { useReducer, useRef, useState } from "react"

// Object라는 개념 잘 알아야 됩니다.
// Object => KEY: Array=> Object

//Back이랑 Front랑 주고 받을 때, 기본적으로 Object하고 Array를 많이 사용하기 때문.
function reducerResult(status, action) {
    console.log('red: ', status);
    console.log('action: ', action);
   
    
    switch(action.op) {
        case "+":
            return action.num1+action.num2;
        case "+":
            return action.num1-action.num2;
        case "*":
            return action.num1*action.num2;
        case "/":
            return action.num1/action.num2;
    }

    return status;
}

function reducerHistory(state, action) {
    console.log(state);
    console.log(action);

    let res = 0;
    switch(action.op) {
        case "+":
            res = action.num1+action.num2;
        case "+":
            res = action.num1-action.num2;
        case "*":
            res = action.num1*action.num2;
        case "/":
            res = action.num1/action.num2;
    }

    let obj = {...action, 'result': res};
    if(action.type ==='add') {
        //[...state, action] <= [...이전 값, 추가 값] => 맨 뒤에 추각
        //[action, ...state] <= [추가 값, ...이전 값] => 맨 앞에 추가
        state.push(obj);
        return [...state, obj];
    }

    
    return state;
}


export default function Red02() {

    const [result, setResult] = useState(0);
    const [result2, setResult2] = useReducer(reducerResult, 0);
    const [histroy, setHistory] = useReducer(reducerHistory, [
        {num1: 5, num2: 10, op:'+', result: 15},
        {num1: 1, num2: 10, op:'+', result: 11}
    ]);

    const num1 = useRef(0);
    const num2 = useRef(0);
    const op = useRef();

    function resultCalc() {
        const cal1 = Number(num1.current.value);
        const cal2 = Number(num2.current.value);

        switch(op.current.value) {
            case "+":
             setResult(cal1+cal2);
             break;
            case "+":
                setResult(cal1-cal2);
                break;
            case "*":
                setResult(cal1*cal2);
                break;
            case "/":
                setResult(cal1/cal2);
                break;
        }
    }

    return (
        <div>
            <h1>Reducer 02</h1>
            <h1>계산기</h1>
            <input type="text" ref={num1}/>
            <input type="text" ref={num2} />
            <select ref={op}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input type="button" value="결과" onClick={() => {
                resultCalc();

                const cal1 = Number(num1.current.value);
                const cal2 = Number(num2.current.value);
                const op1 = op.current.value;

                const send = {
                    'num1': cal1,
                    'num2': cal2,
                    'op': op1,
                    'type': 'add' //리스트 추가 하겠다.
                };

                setHistory(send);
                setResult2(send);
            }} />
            state: {result} / reducer: {result2}
            <h3>계산 결과 History</h3>
            {/* {num1: 5, num2: 10, op:'+', result: 15},
            {num1: 1, num2: 10, op:'+', result: 11} */}

            {histroy.map(
                (item, index) => (
                    <div key={index}>
                        <span>num1: {item.num1}</span>&nbsp;&nbsp;&nbsp;
                        <span>num2: {item.num2}</span>&nbsp;&nbsp;&nbsp;
                        <span>op: {item.op}</span>&nbsp;&nbsp;&nbsp;
                        <span>result: {item.result}</span>
                    </div>
                )
            )}
        </div>
    )
}