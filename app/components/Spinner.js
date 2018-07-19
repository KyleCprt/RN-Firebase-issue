import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

class Spinner extends Component {
  render() {
    return (
      <View style={localStyles.container}>
        <View style={[localStyles.holder, this.props.holderStyle]}>
          <ActivityIndicator size={this.props.size || 'small'} />
          <Text style={[localStyles.text, this.props.textStyle]}>
            {this.props.msg}
          </Text>
        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  holder: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 5,
    padding: 20
  },
  text: {
    marginTop: 10,
    color: 'white',
    fontSize: 14
  }
});

function mapStateToProps(state) {
  return {
    msg: state.appContent.spinnerMsg
  };
}

export default connect(
  mapStateToProps,
  {}
)(Spinner);
