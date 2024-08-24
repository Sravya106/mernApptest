import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        location: "" // Use 'location' to match backend
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
        if (!credentials.name || !credentials.email || !credentials.password || !credentials.location) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const json = await response.json();
            if (response.ok) {
                console.log(json);
                setError(""); // Clear error if successful
                // Handle successful signup (e.g., redirect or show a success message)
            } else {
                setError(json.errors ? json.errors.map(err => err.msg).join(', ') : "An error occurred.");
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
                    <label htmlFor="name" style={{ fontWeight: 'bold' }}>Name</label>
                    <input
                        type="text"
                        style={{
                            width: '100%',
                            borderRadius: '4px',
                            border: '1px solid #ced4da',
                            padding: '10px',
                            fontSize: '16px'
                        }}
                        id="name"
                        name="name"
                        value={credentials.name}
                        onChange={handleChange}
                    />
                </div>
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
                    <div id="emailHelp" style={{
                        fontSize: '14px',
                        color: '#6c757d'
                    }}>We'll never share your email with anyone else.</div>
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
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="location" style={{ fontWeight: 'bold' }}>Location</label>
                    <input
                        type="text"
                        style={{
                            width: '100%',
                            borderRadius: '4px',
                            border: '1px solid #ced4da',
                            padding: '10px',
                            fontSize: '16px'
                        }}
                        id="location"
                        name="location"
                        value={credentials.location}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <input
                        type="checkbox"
                        style={{ marginRight: '10px' }}
                        id="exampleCheck1"
                    />
                    <label htmlFor="exampleCheck1" style={{ fontWeight: '500' }}>Check me out</label>
                </div>
                <button className='m-3 btn-success' type="submit" style={{
                    border: 'none',
                    padding: '7px 30px',
                    borderRadius: '4px',
                    fontSize: '16px',
                    color: '#fff',
                    cursor: 'pointer'
                }}>Submit</button>
                <Link to='/login' className='m-3 btn btn-danger'>Login here</Link>
            </form>
        </div>
    );
}
