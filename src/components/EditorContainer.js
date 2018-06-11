import React from 'react'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import ls from 'local-storage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'


class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteTitle: "",
      editorState: EditorState.createEmpty()
     };
  }

  componentDidMount() {
    if (this.props.noteRendered != null && this.props.noteRendered != "new") {
      this.setState({
        noteTitle: this.props.noteRendered.title,
        editorState: EditorState.createWithContent(convertFromRaw(this.props.noteRendered.content))
      })
    } else {
      this.setState({
        noteTitle: "",
        editorState: EditorState.createEmpty()
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.noteRendered != this.props.noteRendered) {
      if (this.props.noteRendered != null) {
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(this.props.noteRendered.content)) | EditorState.createWithContent(this.props.noteRendered.content)
        })
      }
    }
  }

  onChange = (editorState) => {
    this.setState({
     editorState
   })
   // const contentState = editorState.getCurrentContent()
   // this.saveNewNote(contentState)
  }

  saveNewNote = () => {
    const contentState = this.state.editorState.getCurrentContent()
    this.props.createNote(JSON.stringify(convertToRaw(contentState)))
  }


  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  }




  render() {
    console.log(this.props.noteRendered)

    return (
      <div className="editorContainer">
        <button onClick={this.saveNewNote}>Save</button>
        <button onClick={this.onUnderlineClick}>U</button>
        <button onClick={this.onBoldClick}><b>B</b></button>
        <button onClick={this.onItalicClick}><em>I</em></button>
        <button onClick={this.onToggleCode}><code>&lt;/&gt;</code></button>
        <button onClick={this.undo}>undo</button>

        <div className="editors">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
