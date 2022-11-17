import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"

    const Notesinitial = [
        {
            "_id": "62f7999e691f9dbefadc9b4e",
            "user": "62f25da193e10e68b76b15a1",
            "title": "prince of persia",
            "description": "naa istam mogga",
            "tag": "vattigane",
            "date": "2022-08-13T12:31:26.693Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(Notesinitial);

    //Adding a note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMjVkYTE5M2UxMGU2OGI3NmIxNWExIn0sImlhdCI6MTY2MDM2NzY2NX0.RVUbIhTfPnxAmSH6i2zqS-aXCWpKU_dGI8WvXWs8Blw"
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = {
            "_id": "62f7999e691f9dbefadc9b4e",
            "user": "62f25da193e10e68b76b15a1",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-08-13T12:31:26.693Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    //Get all notes
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMjVkYTE5M2UxMGU2OGI3NmIxNWExIn0sImlhdCI6MTY2MDM2NzY2NX0.RVUbIhTfPnxAmSH6i2zqS-aXCWpKU_dGI8WvXWs8Blw"
            }
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)
    }

    //Deleting a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMjVkYTE5M2UxMGU2OGI3NmIxNWExIn0sImlhdCI6MTY2MDM2NzY2NX0.RVUbIhTfPnxAmSH6i2zqS-aXCWpKU_dGI8WvXWs8Blw"
            }
        });
        const json = await response.json();
        console.log(json)
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMjVkYTE5M2UxMGU2OGI3NmIxNWExIn0sImlhdCI6MTY2MDM2NzY2NX0.RVUbIhTfPnxAmSH6i2zqS-aXCWpKU_dGI8WvXWs8Blw"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;