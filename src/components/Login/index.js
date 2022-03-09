import React, { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'email') {
            setEmail(inputValue);
        }
        else {
            setPassword(inputValue);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!errorMessage) {
            console.log('Submit Form', email, password);
        };
    };

    return (
        <section>
            <h1>Login</h1>
            <form id = "login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input value={email} type="email" name="email" placeholder="email" onChange={handleInputChange} defaultValue={email} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" placeholder="password" onChange={handleInputChange} defaultValue={password} />
                <button type="button" onClick={handleFormSubmit}>Login</button>
            </form>
            {errorMessage && (
                <div>
                    <p>{errorMessage}</p>
                </div>
            )}
        </section>
    )
};

export default LoginForm;