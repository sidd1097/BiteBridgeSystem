import React, { useState } from 'react'

export default function Student() {

  // a hook use to set the property of state variable state(i.e. email and password here)
    const [state, setState] = useState({
        prn:"",
        password:""
    });

    // this function helps in setting the value of state variable (using spread operator[...])
    // to the value the user has input in the input element as it is triggered with 'onChange'
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.value]: value
        });
    };

    return (
        <div className='form-container student-container'>
            {/* onsubmit event not written yet */}
            <form>
                <h1>Login</h1>
                <input 
                    type='text'
                    placeholder='PRN Number'
                    name='prn'
                    value={state.prn}
                    onChange={handleChange}
                ></input>
                <input 
                    type="password"
                    placeholder='Password'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                ></input>
                <a>Forgot your password?</a>
                <button>Login</button>
            </form>
        </div>
    )
}
