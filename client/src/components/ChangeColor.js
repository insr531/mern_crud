import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { themeColor } from '../features/theme';

function ChangeColor() {
    const [color, setColor] = useState("");
    
    const dispatch = useDispatch();
    const themeChangeColor = (color) => {
        alert("Color changed to " + color);
        dispatch(themeColor(color));
    };

    return (
        <div>
            <input type="text" placeholder="Green.."
                onChange={(event) => { setColor(event.target.value) }}>
            </input>
            <button className="btn btn-warning"
                onClick={() => { themeChangeColor(color) }}>
                Change Color
            </button>
        </div>
    );
}

export default ChangeColor;
