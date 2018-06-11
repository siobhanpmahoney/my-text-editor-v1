import React from 'react'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import ls from 'local-storage'


class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

    const content = ls.get('content')

    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent()
    this.saveContent(contentState);
    console.log('content state', convertToRaw(contentState));
    this.setState({
      editorState
    });
  }

  saveContent = (content) => {
    ls.set('content', JSON.stringify(convertToRaw(content)));
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


    return (
      <div className="editorContainer">
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

export default EditorContainer
