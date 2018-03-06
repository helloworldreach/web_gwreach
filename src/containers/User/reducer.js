import { USER_LOGGIN, USER_LOGGED } from './constant';

const initialState = {
    logging: false,
    anonymous: '',
    lastSeen: '',
    name: '',
    status: '',
    uid: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGIN: {
            return {
                ...state,
                logging: true
            };
        }
        case USER_LOGGED: {
            return {
                ...state,
                logging: false,
                anonymous: action.anonymous,
                lastSeen: action.lastSeen,
                name: action.name,
                status: action.status,
                uid: action.uid
            };
        }
        default: {
            return state;
        }
    }
};