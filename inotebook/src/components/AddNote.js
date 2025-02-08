import React from "react";
import { useContext, useState } from "react";
import contextValue from "../context/notes/notesContext";

function AddNote(props) {
  const context = useContext(contextValue);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
        title: "",
        description: "",
        tag: ""
      })
      props.showAlert("Added Successfully","success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>

      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength = {5}
            required
            value = {note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength = {5}
            required
            value = {note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            aria-describedby="emailHelp"
            value = {note.tag}
            onChange={onChange}
            
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled = {note.title.length < 5 || note.description.length < 5}>
          Add note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
