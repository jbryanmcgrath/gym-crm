import React, { useState } from 'react';

function LoginForm() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const { email, password } = formState;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!errorMessage) {
            console.log('Submit Form', formState)
        }
    };

    return (
        <section>
            <h1>Login</h1>
            <form id = "login-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" defaultValue={email} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" defaultValue={password} />
                </div>
            
            </form>
        </section>
    )
}

export default LoginForm;