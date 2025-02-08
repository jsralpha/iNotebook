import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import contextValue from "../context/notes/notesContext";
import NoteComponent from "./NoteComponent";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
    let navigate = useNavigate()
  const context = useContext(contextValue);
  const { notes, getNotes,editNote } = context;

  useEffect(() => {
    if(localStorage.getItem("token")=== null){
        navigate("/login")
    }
    else{
        console.log(localStorage.getItem("token"))
        getNotes();
    }
    // eslint-disable-next-line
  }, []);

  const updatenote = (currnote) => {
    ref.current.click();
    setNote({
      id : currnote._id,
      etitle: currnote.title,
      edescription: currnote.description,
      etag: currnote.tag
    });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id : "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const handleClick = (e) => {
    // console.log("updating the node",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert = {props.showAlert}/>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength = {5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.edescription}
                    minLength = {5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length ===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteComponent key={note._id} note={note} updateNote={updatenote} showAlert= {props.showAlert} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
