import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ADD_USER_URL } from '../../lib/utils/url';

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (name && email && password) {
      try {
        let response = await fetch(ADD_USER_URL, {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setName("");
        setEmail("");
        setPassword("");
        setError("");
        setMessage("User added successfully");
      } catch (errorMessage) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name of the user"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <textarea
            name="email"
            placeholder="Email of the user"
            value={email}
            onChange={e => setEmail(e.target.value)}
            cols={20}
            rows={8}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <textarea
            name="password"
            placeholder="Password of the user"
            value={password}
            onChange={e => setPassword(e.target.value)}
            cols={20}
            rows={8}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit_btn">
            Add Post
          </button>
        </div>
      </form>
      <style jsx>
        {`
          .form {
            width: 400px;
            margin: 10px auto;
          }
          .form-group {
            width: 100%;
            margin-bottom: 10px;
            display: block;
          }
          .form-group label {
            display: block;
            margin-bottom: 10px;
          }
          .form-group input[type="text"] {
            padding: 10px;
            width: 100%;
          }
          .form-group textarea {
            padding: 10px;
            width: 100%;
          }
          .alert-error {
            width: 100%;
            color: red;
            margin-bottom: 10px;
          }
          .alert-message {
            width: 100%;
            color: green;
            margin-bottom: 10px;
          }
        `}
      </style>
    </Layout>
  );
}
