"use client"

import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await axios.post("/api/signup", {
            username,
            email,
            password,
        });
        console.log(response.data);
        } catch (error) {
        setError(error.response.data.message);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
        </form>
        {error && <p>{error}</p>}
        </div>
    );
};

export default SignUp;
