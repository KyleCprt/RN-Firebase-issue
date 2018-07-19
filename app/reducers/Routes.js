/* eslint arrow-body-style: 0 */
import { Reducer } from 'react-native-router-flux';

const defaultReducer = Reducer();

export default (state, action) => {
  return defaultReducer(state, action);
};
