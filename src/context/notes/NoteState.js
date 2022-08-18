import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const Notesinitial = [
        {
            "_id": "62f7984a691f9dbefadc9b49",
            "user": "62f25da193e10e68b76b15a1",
            "title": "prince of persia updated",
            "description": "My childhood fav game updated",
            "tag": "fav",
            "date": "2022-08-13T12:25:46.273Z",
            "__v": 0
        },
        {
            "_id": "62f7999d691f9dbefadc9b4c",
            "user": "62f25da193e10e68b76b15a1",
            "title": "prince of persia",
            "description": "My childhood fav game",
            "tag": "fav",
            "date": "2022-08-13T12:31:25.791Z",
            "__v": 0
        },
        {
            "_id": "62f7999e691f9dbefadc9b4e",
            "user": "62f25da193e10e68b76b15a1",
            "title": "prince of persia",
            "description": "My childhood fav game",
            "tag": "fav",
            "date": "2022-08-13T12:31:26.693Z",
            "__v": 0
        },
        {
            "_id": "62f7984a691f9dbefadc9b49",
            "user": "62f25da193e10e68b76b15a1",
            "title": "prince of persia updated",
            "description": "My childhood fav game updated",
            "tag": "fav",
            "date": "2022-08-13T12:25:46.273Z",
            "__v": 0
        },
        {
            "_id": "62f7999d691f9dbefadc9b4c",
            "user": "62f25da193e10e68b76b15a1",
            "title": "prince of persia",
            "description": "My childhood fav game",
            "tag": "fav",
            "date": "2022-08-13T12:31:25.791Z",
            "__v": 0
        },
        {
            "_id": "62f7999e691f9dbefadc9b4e",
            "user": "62f25da193e10e68b76b15a1",
            "title": "prince of persia",
            "description": "My childhood fav game",
            "tag": "fav",
            "date": "2022-08-13T12:31:26.693Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(Notesinitial);

    //Adding a note
    const addNote = (title, description, tag) => {
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

    //Deleting a note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }

    //Edit a note
    const editNote = (id, title, description, tag) => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;