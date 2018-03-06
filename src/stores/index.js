import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import room from '../containers/Room/reducer';
import user from '../containers/User/reducer';
import local from '../containers/LocalStream/reducer';
import streams from '../containers/Streams/reducer';
// import counter from './counter';

export default combineReducers({
    router: routerReducer,
    room,
    user,
    local,
    streams
})