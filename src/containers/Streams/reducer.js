import {
    STREAM_PUBLISHED, STREAM_UNPUBLISHED,
    STREAM_SUBSCRIBING, STREAM_SUBSCRIBED
} from './constant';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case STREAM_PUBLISHED: {
            return {
                ...state,
                [action.stream.uid]: {
                    uid: action.stream.uid,
                    roomId: action.stream.roomId,
                    from: Object.assign({}, action.stream.from),
                    type: action.stream.type,
                    device: action.stream.device,
                    muted: Object.assign({}, action.stream.muted),
                    subscribed: false,
                    container: `stream-${action.stream.uid}`
                }
            }
        }
        case STREAM_SUBSCRIBING: {
            return {
                ...state,
                [action.uid]: {
                    ...state[action.uid],
                    subscribed: action.subscribed
                }
            }
        }
        case STREAM_SUBSCRIBED: {
            return {
                ...state,
                [action.uid]: {
                    ...state[action.uid],
                    subscribed: action.subscribed
                }
            }
        }
        case STREAM_UNPUBLISHED: {
            return {
                ...state,
            }
        }
        default: {
            return state;
        }
    }
};