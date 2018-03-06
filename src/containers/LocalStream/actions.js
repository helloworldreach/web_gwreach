import Reach from 'webcom-reach';
import {
    STREAM_SHARING, STREAM_SHARED, STREAM_SHARING_FAILURE,
    STREAM_UNSHARING, STREAM_UNSHARED, STREAM_UNSHARING_FAILURE,
    STREAM_AUDIO_MUTING, STREAM_AUDIO_MUTED,
    STREAM_AUDIO_UNMUTING, STREAM_AUDIO_UNMUTED,
} from './constant';
import { rooms, streams } from '../../utils/reach';


export function sharing() {
    return dispatch => {
        return dispatch({type: STREAM_SHARING});
    };
}
/**
 * Sharing local stream
 * @param roomUid
 * @param videoTag
 * @returns {function(*)}
 */
export function share(roomUid, videoTag) {
    return (dispatch, getState) => {
        return rooms.find(roomUid).share(Reach.types.AUDIO_VIDEO, videoTag)
            .then((localStream) => {
                streams.add(localStream);
                return dispatch({
                    type: STREAM_SHARED,
                    stream: {
                        type: localStream.type,
                        status: localStream.status,
                        uid: localStream.uid,
                        muted: localStream.muted,
                        from: {
                            uid: getState().user.uid,
                            name: getState().user.name,
                        }
                    }
                });
            })
            .catch((error) => {
                dispatch({ type: STREAM_SHARING_FAILURE, error });
                throw error;
            })
    }
}

/**
 * Close local stream
 * @returns {function(*)}
 */
export function unShare() {
    return (dispatch, getState) => {
        dispatch({ type: STREAM_UNSHARING });
        const { uid } = getState().local;

        return streams.find(uid).close()
            .then(() => {
                streams.remove(uid);
                dispatch({ type: STREAM_UNSHARED });
            })
            .catch((error) => {
                dispatch({
                    type: STREAM_UNSHARING_FAILURE,
                    error
                });
                throw error;
            })
    }
}

/**
 * Mute audio on local stream
 * @param streamUid
 * @returns {function(*)}
 */
export function mute(streamUid) {
    return dispatch => {
        dispatch({ type: STREAM_AUDIO_MUTING });
        return new Promise((resolve) => {
           streams.find(streamUid).mute();
           return resolve(
               dispatch({
                   type: STREAM_AUDIO_MUTED,
                   muted: {
                       audio: true,
                       video: false
                   }
               })
           );
        });
    };
}

/**
 * Unmute audio on local stream
 * @param streamUid
 * @returns {function(*)}
 */
export function unMute(streamUid) {
    return dispatch => {
        dispatch({ type: STREAM_AUDIO_UNMUTING });
        return new Promise((resolve) => {
            streams.find(streamUid).unMute();
            return resolve(
                dispatch({
                    type: STREAM_AUDIO_UNMUTED,
                    muted: {
                        audio: false,
                        video: false
                    }
                })
            );
        });
    };
}