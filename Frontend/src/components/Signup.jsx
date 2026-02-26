import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Reusing Login styles for consistency

const Signup = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://https://triplens-duml.onrender.com/users/addUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ name, email, password })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} ${errorText}`);
            }

            const isAdded = await response.json();

            if (isAdded) {
                // Redirect to login after signup
                alert("Account created successfully! Please login.");
                navigate('/login');
            } else {
                setError('Failed to create account. User might already exist.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            if (err.message.includes('Failed to fetch')) {
                setError('Cannot connect to server. Is the backend running on port 8080?');
            } else {
                setError(err.message || 'An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Sign Up</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
