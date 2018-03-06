import {
    ROOM_ENTERING, ROOM_ENTERED,
    ROOM_STARTING_MEDIASERVER, ROOM_STOPING_MEDIASERVER
} from './constants';

const initialState = {
    name: '',
    uid: '',
    owner: '',
    useMediaServer: false,
    extra: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ROOM_ENTERING: {
            return {
                ...state,
                name: action.room
            };
        }
        case ROOM_ENTERED: {
            return {
                ...state,
                uid: action.uid,
                owner: action.owner,
                extra: action.extra
            };
        }
        case ROOM_STARTING_MEDIASERVER:
        case ROOM_STOPING_MEDIASERVER: {
            return {
                ...state,
                useMediaServer: action.useMediaServer
            }
        }
        default: {
            return state;
        }
    }
};