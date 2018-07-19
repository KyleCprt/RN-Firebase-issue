import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

class CustomStatusBar extends Component {
  render() {
    isTranslucent = this.props.headerBackgroundColor === 'transparent';
    return (<StatusBar translucent={isTranslucent} backgroundColor={this.props.headerBackgroundColor}/>);
  }
}

function mapStateToProps(state) {
  return {
    headerBackgroundColor: state.appContent.headerBackgroundColor
  };
}

export default connect(
  mapStateToProps,
  {}
)(CustomStatusBar);
