import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
// import notes from '../assets/data'
import {Link,useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
const NotePage = () => {
  const { id } = useParams();
  
  // const note=notes.find(note=>note.id===Number(id))
  let [note,setNote]=useState(null)
  useEffect(()=>{
      getNote();
  },[id])

  let getNote=async()=>{
    let response=await fetch(`http://localhost:3004/notes/${id}`)
    let data=await response.json()
    setNote(data)
  }

  const updateNote = async () => {
    await fetch(`http://127.0.0.1:3004/notes/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...note, 'updated': new Date() })
    })
    navigate({ pathname: '/' }) 

    
}


const deleteNote = async () => {
  await fetch(`http://127.0.0.1:3004/notes/${id}/`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
})
navigate({ pathname: '/' }) 


}

const createNote = async () => {


  await fetch(`http://127.0.0.1:3004/notes/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date() })
  })
  navigate({ pathname: '/' }) 

}


const navigate = useNavigate()

  let handleSubmit = () => {

    if (id != "new" && !note.body) {
      deleteNote()
  } else if (id != "new") {
      updateNote()
  } else if (id === 'new' && note !== null) {
      createNote()
  }
        navigate({ pathname: '/' }) 
}


    return (

    <div className='note'>
        <div className='note-header'>
          <h3>
            <Link to='/'>
              <ArrowLeft onClick={handleSubmit}/>

              
            </Link>
          </h3>
          {id != 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

          </div>
          <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} placeholder="Edit note" value={note?.body}></textarea>
          
      </div>
  )
}

export default NotePage