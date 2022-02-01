import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeColor } from '../features/theme';

function ChangeColor() {
    const [color, setColor] = useState("");
    const dispatch = (color) => {
        alert("color changed to " + color);
        useDispatch(changeColor(color))
    };

    return (
        <div>
            <input type="text" placeholder="Green.."
                onChange={(event) => { setColor(event.target.value) }}>
            </input>
            <button className="btn btn-warning"
                onClick={() => { dispatch(color) }}>
                Change Color
            </button>
        </div>
    );
}

export default ChangeColor;
