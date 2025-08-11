import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: {
            street: '',
            city: '',
            zipCode: ''
        }
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [addressField]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/register', formData);
            onLogin(response.data.user, response.data.token);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>□ JOIN SQUID CRUST</h2>
                {error && <div className="error-message">⚠️ {error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">CUSTOMER Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your survival name..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">CUSTOMER ID (Email):</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your unique customer identification..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">SECURITY CODE:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create your secret access code..."
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Contact NO:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Emergency contact number..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="street">HOME ADDRESS:</label>
                        <input
                            type="text"
                            id="street"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleChange}
                            placeholder="Your safe house location..."
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city">CITY:</label>
                            <input
                                type="text"
                                id="city"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                                placeholder="City zone..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="zipCode">ZIP CODE:</label>
                            <input
                                type="text"
                                id="zipCode"
                                name="address.zipCode"
                                value={formData.address.zipCode}
                                onChange={handleChange}
                                placeholder="Zone code..."
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? '□ Joining Squid Crust...' : '□ ENTER SQUID CRUST'}
                    </button>
                </form>

                <p className="auth-link">
                    Already a customer? <Link to="/login">○ Return to Squid Crust</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;