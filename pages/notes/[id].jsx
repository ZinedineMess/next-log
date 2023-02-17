import React, { useState } from "react";
import Layout from "../../components/Layout";
import { GET_NOTE_URL, GET_NOTES_URL, EDIT_NOTE_URL } from '../../lib/utils/url';

export async function getStaticProps({ params }) {
  try {
    let response = await fetch(GET_NOTE_URL + params?.id);
    let responseFromServer = await response.json();

    return {
      props: {
        notes: {
          _id: responseFromServer._id,
          title: responseFromServer.title,
          content: responseFromServer.content,
          author: responseFromServer.author,
        },
      },
    };
  } catch (e) {
    console.log("error ", e);
    return {
      props: {
        notes: {
          _id: "",
          title: "",
          content: "",
          author: "",
        },
      },
    };
  }
}

export async function getStaticPaths() {
  let notes = await fetch(GET_NOTES_URL);

  let notesFromServer = await notes.json();
  return {
    paths: notesFromServer.map(note => {
      return {
        params: {
          id: note._id,
        },
      };
    }),
    fallback: false, // can also be true or 'blocking'
  };
}

export default function EditNotes({ notes: { _id, title, content, author } }) {
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);
  const [noteAuthor, setNoteAuthor] = useState(author);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (noteTitle && noteContent && noteAuthor) {
      try {
        let response = await fetch(EDIT_NOTE_URL + _id, {
          method: "POST",
          body: JSON.stringify({
            title: noteTitle,
            content: noteContent,
            author: noteAuthor,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setNoteTitle("");
        setNoteContent("");
        setNoteAuthor("");
        setError("");
        setMessage("Note edited successfully");
      } catch (errorMessage) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };

  // no such post exists
  if (!title && !content && !id && process.browser) {
    return (window.location.href = "/");
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title of the note"
            onChange={e => setNoteTitle(e.target.value)}
            value={noteTitle ? noteTitle : ""}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            placeholder="Content of the note"
            value={noteContent ? noteContent : ""}
            onChange={e => setNoteContent(e.target.value)}
            cols={20}
            rows={8}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <textarea
            name="author"
            placeholder="Author of the note"
            value={noteAuthor ? noteAuthor : ""}
            onChange={e => setNoteAuthor(e.target.value)}
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
