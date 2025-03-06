import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!username) {
            valid = false;
            errors.username = 'Username is required';
        }

        if (!email) {
            valid = false;
            errors.email = 'Email is required';
        }

        if (!password) {
            valid = false;
            errors.password = 'Password is required';
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted successfully', formData);
            // Handle form submission logic here
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
                {errors.username && <span>{errors.username}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
