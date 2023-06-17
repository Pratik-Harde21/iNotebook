import NoteContext from "./noteContext";
import React, { useState } from 'react'

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)


    // Get all Notes
    const getNotes = async() => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZjRjNzdmODYyNzBhMWYyZjVjOTUzIn0sImlhdCI6MTYzOTk3ODgzM30.AkWteirDC28yDGcc8kkbSuWvAG0xd3RCH1DmxszUsjs'
            },
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
        // eslint-disable-next-line
    }
    // Add a Note
    const addNote = async(title, description, tag) => {
        // TODO: API CALL
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZjRjNzdmODYyNzBhMWYyZjVjOTUzIn0sImlhdCI6MTYzOTk3ODgzM30.AkWteirDC28yDGcc8kkbSuWvAG0xd3RCH1DmxszUsjs'
            },
            body: JSON.stringify({title, description, tag})
        });

        const json = await response.json();
        console.log(json)

        console.log("Adding a new note")
        const note = {
            "_id": "61c0aced7f3d1a9cc57vdce02",
            "user": "61bf4c77f86270a1f2f5c953",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "1640017133628",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }


    // Delete a Note 
    const deleteNote = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZjRjNzdmODYyNzBhMWYyZjVjOTUzIn0sImlhdCI6MTYzOTk3ODgzM30.AkWteirDC28yDGcc8kkbSuWvAG0xd3RCH1DmxszUsjs'
            },
        });
        const json = response.json()
        console.log(json)

        const newNotes = notes.filter((note) => { return note._id !== id })
        console.log("Deleteingthe node with id" + id)
        setNotes(newNotes)
    }


    // Edit Note 
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZjRjNzdmODYyNzBhMWYyZjVjOTUzIn0sImlhdCI6MTYzOTk3ODgzM30.AkWteirDC28yDGcc8kkbSuWvAG0xd3RCH1DmxszUsjs'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;


























// import NoteContext from "./noteContext";
// import React, { useState } from 'react'

// const NoteState = (props) => {
//     const S1 = {
//         "name": "Harry",
//         "class": "5b"
//     }
//     // const [state, setState] = useState(S1)
//     // const update = ()=>{
//     //     setTimeout(() => {
//     //         setState({
//     //             "name": "Pratik",
//     //             "class": "10b"
//     //         })
//     //     }, 1000);
//     // }
//     return (
//         // <NoteContext.Provider value={{state, update}}>
//         <NoteContext.Provider value={{state}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

// export default NoteState; 