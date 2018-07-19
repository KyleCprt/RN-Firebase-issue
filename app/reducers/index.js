import { combineReducers } from 'redux';
import appContent from './AppContent';
import route from './Routes';

const AppReduces = combineReducers({
  appContent,
  route
});
export default AppReduces;
