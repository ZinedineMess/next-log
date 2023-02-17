import Layout from "../components/Layout";
import { useState } from "react";
import { GET_NOTES_URL, GET_USERS_URL, DELETE_NOTES_URL, DELETE_USERS_URL } from "../lib/utils/url";

export async function getServerSideProps() {
  try {
    let responseNotes = await fetch(GET_NOTES_URL);
    let notes = await responseNotes.json();
    let responseUsers = await fetch(GET_USERS_URL);
    let users = await responseUsers.json();

    return {
      props: { 
        notes: JSON.parse(JSON.stringify(notes)),
        users: JSON.parse(JSON.stringify(users)),
      },
    };
  } catch (e) {
    return console.error(e);
  }
}

export default function NotesAndUsers(props) {
  const [notes, setNotes] = useState(props.notes);
  const [users, setUsers] = useState(props.users);

  const handleDeleteNote = async noteId => {
    try {
      let response = await fetch(DELETE_NOTES_URL + noteId, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occurred while deleting ", error);
    }
  };

  const handleDeleteUser = async userId => {
    try {
      let response = await fetch(DELETE_USERS_URL + userId, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occurred while deleting ", error);
    }
  };

  return (
    <Layout>
      <h1 className="posts-body-heading">Next Log</h1>
      <div className="posts-body">
        <h2>Notes</h2>  
        {notes.length > 0 ? (
          <ul className="posts-list">
            {notes.map((note, index) => {
              return (
                <li key={index} className="post-item">
                  <div className="post-item-details">
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                    <p>{note.author}</p>
                  </div>
                  <div className="post-item-actions">
                    <a href={`/notes/${note._id}`}>Edit</a>
                    <button onClick={() => handleDeleteNote(note._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h2 className="posts-body-heading">Ooops! No notes added so far</h2>
        )}
      </div>

      <div className="posts-body">
        <h2>Users</h2>  
        {users.length > 0 ? (
          <ul className="posts-list">
            {users.map((user, index) => {
              return (
                <li key={index} className="post-item">
                  <div className="post-item-details">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.password}</p>
                  </div>
                  <div className="post-item-actions">
                    <a href={`/users/${user._id}`}>Edit</a>
                    <button onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h2 className="posts-body-heading">Ooops! No users added so far</h2>
        )}
      </div>
      <style jsx>
        {`
          .posts-body {
            width: 400px;
            margin: 10px auto;
          }
          .posts-body-heading {
            font-family: sans-serif;
          }
          .posts-list {
            list-style-type: none;
            display: block;
          }
          .post-item {
            width: 100%;
            padding: 10px;
            border: 1px solid #d5d5d5;
          }
          .post-item-actions {
            display: flex;
            justify-content: space-between;
          }
          .post-item-actions a {
            text-decoration: none;
          }
        `}
      </style>
    </Layout>
  );
}
