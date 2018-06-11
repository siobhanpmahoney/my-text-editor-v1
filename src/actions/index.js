import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
export const LOAD_ALL_NOTES = 'LOAD_ALL_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'

export function loadAllNotes() {
  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/notes')
    .then(response => response.json())
    .then(json => dispatch({
      type: LOAD_ALL_NOTES,
      allNotes: json
    }))
  }
}

export function createNote(newNote) {
  return(dispatch) => {
    fetch("http://localhost:3000/api/v1/notes"),
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        title: 'new note test',
        content: convertToRaw(newNote)
      })
    }
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: CREATE_NOTE,
        newNote: json
      })
    })
  }
}

export function updateNote(selectedNote) {
  let url = `http://localhost:3000/api/v1/notes/selectedNote.id`
  return (dispatch) => {
    return fetch(url,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          title: selectedNote.title,
          content: selectedNote.content,
          user_id: 1
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: UPDATE_NOTE,
        updatedNote: json
      }))
    }
  }
