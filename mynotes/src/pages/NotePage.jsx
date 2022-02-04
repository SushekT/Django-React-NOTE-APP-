import React, {useState, useEffect} from 'react'

//import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotePage = () => {

    let [notes, setNotes] = useState([])

    useEffect(()=>{
        getNotes()

    },[])

    let getNotes = async() => {
        let response = await fetch('https://notes.pandamotions.com/api/')
        let data = await response.json()
        console.log(data)

        setNotes(data)
    }


    return (
    
        <div className="notes">
            <div className='notes-header'>
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>

            <div className='notes-list'>
                {notes.map((note, index)=> (
                    <ListItem key={index} note={note} />
                ))}

            </div>

            <AddButton />
        </div>
       
    )
}

export default NotePage
