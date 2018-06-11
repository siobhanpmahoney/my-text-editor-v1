import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'

class NoteList extends React.Component {
  render() {
    return (
      <div className="noteList">
      {this.props.savedNotes.map((n) => {
        return <div key={n.id} id={n.id} className={"savedNote"} onClick={this.props.selectSavedNote}>{n.title}</div>
      })}
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
