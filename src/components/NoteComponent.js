import React from 'react'
import { useContext } from "react";
import contextValue from "../context/notes/notesContext";

function NoteComponent(props) {
    const context = useContext(contextValue);
    const {deleteNote} = context;
    const {note,updateNote} = props;
  return (
    <div className='col-md-3 my-3'>
  <div className="card-body mx-3 my-3">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description} </p>
    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success");}}></i>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
  </div>
</div>
  )
}

export default NoteComponent
