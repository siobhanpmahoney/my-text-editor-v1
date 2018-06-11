import {combineReducers} from 'redux'
import {LOAD_ALL_NOTES, CREATE_NOTE, UPDATE_NOTE} from '../actions'

const notes = (state={savedNotes: []}, action) => {
  switch(action.type) {
    case LOAD_ALL_NOTES:
      return Object.assign({},
      state,
      {
        savedNotes: action.allNotes
      }
    )

    case CREATE_NOTE:
      let allNoteState = state.savedNotes.slice(0)
      state = Object.assign({},
        state,
        {
          savedNotes: [...allNoteState, action.newNote]
        }
      )
      return state;

    case UPDATE_NOTE:
      let noteMatch = state.savedNotes.find((n) => {
        return n.id == action.updatedNote.id
      })
      let oldNoteState = state.savedNotes.slice(0)
      let updatedNoteState = [
        ...oldNoteState.slice(0, oldNoteState.indexOf(noteMatch)),
        action.updatedNote,
        ...oldNoteState.slice(oldNoteState.indexOf(noteMatch)+1)
      ]
      state = Object.assign({},
        state,
        {
          savedNotes: updatedNoteState
        }
      )
      return state;


    default:
      return state
  }
}

const rootReducer = combineReducers({
  notes
})

export default rootReducer
