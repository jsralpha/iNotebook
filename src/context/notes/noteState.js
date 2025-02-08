import { useState } from "react";
import NoteContext from "./notesContext";

const host = "http://localhost:5000";

const NoteState = (props) => {
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          localStorage.getItem("token")
      },
    });

    const json = await response.json();

    // console.log(json);

    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/createnotes`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note

  const deleteNote = async (id) => {
    // API CALL

    const url = `${host}/api/notes/deletenote/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          localStorage.getItem("token") ,
      },
    });

    const json = await response.json();
    // eslint-disable-next-line
    // console.log(json);

    // console.log("deleting a note with id " + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Edit a Note

  const editNote = async (id, title, description, tag) => {
    // API call
    const url = `${host}/api/notes/updatenote/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    // eslint-disable-next-line

    let newNotes = JSON.parse(JSON.stringify(notes))

    // login to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
