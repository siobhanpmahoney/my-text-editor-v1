import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import NoteList from './NoteList'
import EditorContainer from './EditorContainer'

class PageContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      noteRendered: null
    }
  }

  componentDidMount(){
    this.props.loadAllNotes()
  }


  selectSavedNote = (event) => {
    event.preventDefault()
    let noteId = event.target.id
    let selectedNote = this.props.savedNotes.find((n) => {
      return n["id"] == noteId
    })
    this.setState({
      noteRendered: selectedNote
    })

  }

  render() {
    console.log("in app render")
    console.log("props", this.state.noteRendered)
    return (
      <div>
      <NoteList selectSavedNote={this.selectSavedNote}/>
      <EditorContainer />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    savedNotes: state.notes.savedNotes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
