import {
    STREAM_SHARING, STREAM_SHARED,
    STREAM_UNSHARING, STREAM_UNSHARED,
    STREAM_AUDIO_MUTED, STREAM_AUDIO_UNMUTED
} from './constant';

const initialState = {
    sharing: false,
    unSharing: false,
    type: '',
    uid: '',
    status: '',
    from: {
        uid: '',
        name: ''
    },
    muted: {
        audio: false,
        video: false
    }
};
export default (state = initialState, action) => {
    switch (action.type) {
        case STREAM_SHARING: {
            return {
                ...state,
                sharing: true
            }
        }
        case STREAM_UNSHARING: {
            return {
                ...state,
                unSharing: true
            };
        }
        case STREAM_SHARED: {
            return {
                ...state,
                sharing: false,
                type: action.stream.type,
                uid: action.stream.uid,
                status: action.stream.status,
                from: Object.assign({}, action.stream.from),
                muted: Object.assign({}, action.stream.muted)
            }
        }
        case STREAM_UNSHARED: {
            return {
                ...state,
                sharing: false,
                unSharing: false,
                type: '',
                uid: '',
                status: '',
                from: {
                    uid: '',
                    name: ''
                },
                muted: {
                    audio: false,
                    video: false
                }
            }
        }
        case STREAM_AUDIO_MUTED:
        case STREAM_AUDIO_UNMUTED: {
            return {
                ...state,
                muted: Object.assign({}, action.muted)
            }
        }
        default: {
            return state
        }
    }
}