import React, { useState } from 'react'

export default function Admin() {

    const [state, setState] = useState({
        adminname:"",
        password:""
    });

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    return (
        <div className='form-container admin-container'>
            <form>
                <h1>Admin Account</h1>
                <input
                    type='text'
                    name='name'
                    value={state.adminname}
                    onChange={handleChange}
                    placeholder='Name'
                ></input>
                <input
                    type='password'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                    placeholder='Password'
                ></input>
                <button>Login</button>
            </form>
        </div>
    )
}
