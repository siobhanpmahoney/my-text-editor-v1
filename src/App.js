import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions'

import PageContainer from './components/PageContainer'
import './App.css'

class App extends Component {



  render() {

    return (
      <div className="App">
        <PageContainer />
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
