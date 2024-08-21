import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!credentials.email || !credentials.password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const json = await response.json();
            if (response.ok) {
                console.log(json);
                setError(""); 
            } else {
                setError(json.errors ? json.errors.map(err => err.msg).join(', ') : "Invalid email or password.");
            }
        } catch (error) {
            console.error('Network error:', error);
            setError("Network error occurred.");
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}>
            <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email address</label>
                    <input
                        type="email"
                        style={{
                            width: '100%',
                            borderRadius: '4px',
                            border: '1px solid #ced4da',
                            padding: '10px',
                            fontSize: '16px'
                        }}
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
                    <input
                        type="password"
                        style={{
                            width: '100%',
                            borderRadius: '4px',
                            border: '1px solid #ced4da',
                            padding: '10px',
                            fontSize: '16px'
                        }}
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <button className='m-3 btn-success' type="submit" style={{
                    border: 'none',
                    padding: '7px 30px',
                    borderRadius: '4px',
                    fontSize: '16px',
                    color: '#fff',
                    cursor: 'pointer'
                }}>Login</button>
                <Link to='/createuser' className='m-3 btn btn-danger'>Sign up here</Link>
            </form>
        </div>
    );
}
