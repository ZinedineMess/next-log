import React, { useState } from "react";
import Layout from "../../components/Layout";
import { GET_USER_URL, GET_USERS_URL, EDIT_USER_URL } from '../../lib/utils/url';

export async function getStaticProps({ params }) {
  try {
    let response = await fetch(GET_USER_URL + params?.id);
    let responseFromServer = await response.json();

    return {
      props: {
        user: {
          _id: responseFromServer._id,
          name: responseFromServer.name,
          email: responseFromServer.email,
          password: responseFromServer.password,
        },
      },
    };
  } catch (e) {
    console.log("error ", e);
    return {
      props: {
        user: {
          _id: "",
          name: "",
          email: "",
          password: "",
        },
      },
    };
  }
}

export async function getStaticPaths() {
  let users = await fetch(GET_USERS_URL);

  let userFromServer = await users.json();
  return {
    paths: userFromServer.map(user => {
      return {
        params: {
          id: user._id,
        },
      };
    }),
    fallback: false, // can also be true or 'blocking'
  };
}

export default function EditUser({ user: { _id, name, email, password } }) {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPassword, setUserPassword] = useState(password);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (userName && userEmail && userPassword) {
      try {
        let response = await fetch(EDIT_USER_URL + _id, {
          method: "POST",
          body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: userPassword,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setError("");
        setMessage("User edited successfully");
      } catch (errorMessage) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };

  // no such post exists
  if (!name && !email && !id && process.browser) {
    return (window.location.href = "/");
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group">
          <label>Name</label>
          <input
            type="name"
            placeholder="Name of the user"
            onChange={e => setUserName(e.target.value)}
            value={userName ? userName : ""}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <textarea
            name="email"
            placeholder="Email of the user"
            value={userEmail ? userEmail : ""}
            onChange={e => setUserEmail(e.target.value)}
            cols={20}
            rows={8}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <textarea
            name="password"
            placeholder="Password of the user"
            value={userPassword ? userPassword : ""}
            onChange={e => setUserPassword(e.target.value)}
            cols={20}
            rows={8}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit_btn">
            Update
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
