import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'

function Note({match, history}) {

    let noteId = match.params.id    
    
    let [note, setNoteDetail] = useState('')

    useEffect(() => {
        getNote()
    },[noteId])

    let getNote = async() =>{
        if (noteId === 'new') return
        let response = await fetch(`https://notes.pandamotions.com/api/details/${noteId}`)
        let data = await response.json()
        setNoteDetail(data)

    }

    let updateNote = async () => {
        await fetch(`https://notes.pandamotions.com/api/update/${noteId}`, {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({...note, 'updated': new Date()} )
        })
    }


    let createNote = async () => {
        if (noteId !== 'new') return
        await fetch(`https://notes.pandamotions.com/api/create`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({...note, 'updated': new Date()} )
        })

        history.push('/')
    }

    let deleteNote = async() => {
        await fetch(`https://notes.pandamotions.com/api/delete/${noteId}`, {
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON. stringify(note)
        })
        history.push('/')
    }

    let handleSubmit = () =>{

        if (noteId !== 'new' && !note.body){
            deleteNote()
        }

        else if(noteId !== 'new'){
            updateNote()
        }

        else if(noteId === 'new' && note !== ''){
            createNote()
        }
        
        history.push('/')
    }

    //let note = notes.find(note => note.id == noteId)

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to='/'>
                    
                            <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                {noteId !== 'new' ? (
                    
                    <button onClick={deleteNote}>Delete</button>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => {setNoteDetail({...note, 'body': e.target.value})}} value={note.body}>

            </textarea>

        </div>
  
    )
}

export default Note
