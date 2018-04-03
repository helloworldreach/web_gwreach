import { push } from 'react-router-redux';
import Reach from 'webcom-reach';
import {
    ROOM_ENTERING, ROOM_ENTERED,
    ROOM_CHANGING_MEDIASERVER, ROOM_STARTING_MEDIASERVER, ROOM_STOPING_MEDIASERVER
} from './constants';
import {
    STREAM_PUBLISHED, STREAM_PUBLISHED_FAILURE,
    STREAM_UNPUBLISHED, STREAM_UNPUBLISHED_FAILURE
} from '../Streams/constant';
import reach, { rooms, streams } from '../../utils/reach';
import * as DataSync from '../../utils/dataSync';
import { loggin } from '../User/actions';


/**
 * Entering in the room
 * Create it if not, join if already exist
 * @param name
 * @returns {function(*=)}
 */
export function entering(name) {
    return dispatch => {
        dispatch({ type: ROOM_ENTERING, room: name });

        return dispatch(loggin())
            .then(() => {
               return __isRoomCreated(name);
            })
            .then((room) => {
                // Room exist
                return __joinRoom(room, dispatch);
            })
            .then(() => {
                return dispatch(push('/room'));
            })
            .catch(() => {
                // Room need to be created
                return __createRoom(name, dispatch);
            })
            .then(() => {
                return dispatch(push('/room'));
            });
    }
}

/**
 * Listen to event for the room
 * @param roomUid
 * @param dispatch
 * @returns {function(*)}
 */
export function roomListener(roomUid, dispatch) {
    // Listen for mediaserver status change
    __mediaServerChange(roomUid, dispatch);
    const room = rooms.find(roomUid);
    // Dispatchin for stream published event
    room.on(
        Reach.events.room.STREAM_PUBLISHED,
        stream => __streamPublished(stream, dispatch),
        error => __streamPublishedFailure(error, dispatch)
    );
    // Dispatching for stream unpublished event
    room.on(
        Reach.events.room.STREAM_UNPUBLISHED,
        stream => __streamUnPublished(stream, dispatch),
        error => __streamUnPublishedFailure(error, dispatch)
    );
}

/**
 * Toggle the "useMediaServer" flag of the room
 * @param roomUid
 * @returns {function(*, *)}
 */
export function toggleMediaServer(roomUid) {
    return (dispatch, getState) => {
        dispatch({ type: ROOM_CHANGING_MEDIASERVER });
        const { useMediaServer } = getState().room;
        DataSync.update(`_/rooms/${roomUid}/meta`, { useMediaServer: !useMediaServer });
        /*if (!useMediaServer) {
            return dispatch({ type: ROOM_STARTING_MEDIASERVER, useMediaServer: !useMediaServer });
        }
        return dispatch({ type: ROOM_STOPING_MEDIASERVER, useMediaServer: !useMediaServer });*/
    };
}

function __mediaServerChange(roomUid, dispatch) {
    DataSync.on(`_/rooms/${roomUid}/meta/useMediaServer`, 'value', snap => {
       let useMediaServer = snap.val();
       useMediaServer = useMediaServer !== null;
       if (useMediaServer) {
           return dispatch({ type: ROOM_STARTING_MEDIASERVER, useMediaServer: useMediaServer });
       }
        return dispatch({ type: ROOM_STOPING_MEDIASERVER, useMediaServer: useMediaServer });
    });
}

/**
 * Dispatch on new published stream
 * @param stream
 * @param dispatch
 * @returns {*}
 * @private
 */
function __streamPublished(stream, dispatch) {
    streams.add(stream);
    reach().getUser(stream.from)
        .then((user) => {
            return dispatch({
                type: STREAM_PUBLISHED,
                stream: {
                    uid: stream.uid,
                    roomId: stream.roomId,
                    from: {
                        uid: stream.from,
                        name: user.name
                    },
                    type: stream.type,
                    device: stream.device,
                    muted: stream.muted
                }
            });
        });
}

/**
 * Dispatch on new published stream failure
 * @param error
 * @param dispatch
 * @returns {*}
 * @private
 */
function __streamPublishedFailure(error, dispatch) {
    return dispatch({
        type: STREAM_PUBLISHED_FAILURE,
        error
    });
}

/**
 * Dispatch on new published stream
 * @param stream
 * @param dispatch
 * @returns {*}
 * @private
 */
function __streamUnPublished(stream, dispatch) {
    streams.remove(stream);
    return dispatch({
        type: STREAM_UNPUBLISHED,
        stream
    });
}

/**
 * Dispatch on new published stream failure
 * @param error
 * @param dispatch
 * @returns {*}
 * @private
 */
function __streamUnPublishedFailure(error, dispatch) {
    return dispatch({
        type: STREAM_UNPUBLISHED_FAILURE,
        error
    });
}

/**
 * Create the room
 * @param name
 * @param dispatch
 * @returns {Promise<any>}
 * @private
 */
function __createRoom(name, dispatch) {
    return new Promise((resolve) => {
        reach().createRoom(name)
            .then((room) =>{
                rooms.add(room);
                DataSync.set(`rooms/${room.name}`, room.uid);
                dispatch({
                    type: ROOM_ENTERED,
                    name: room.name,
                    uid: room.uid,
                    owner: room.owner,
                    extra: room.extra
                });
                roomListener(room.uid, dispatch);
                return resolve(room);
            });
    });
}

/**
 * Join the room
 * @param room
 * @param dispatch
 * @returns {Promise<any>}
 * @private
 */
function __joinRoom(room, dispatch) {
    return new Promise((resolve) => {
        room.join()
            .then(() => {
                rooms.add(room);
                dispatch({
                    type: ROOM_ENTERED,
                    name: room.name,
                    uid: room.uid,
                    owner: room.owner,
                    extra: room.extra
                });
                roomListener(room.uid, dispatch);
                return resolve(room);
            });
    });
}

/**
 * Check if the room exist
 * @param name
 * @returns {Promise<any>}
 * @private
 */
function __isRoomCreated(name) {
    return new Promise((resolve, reject) => {
        DataSync.once(`rooms/${name}`, 'value')
            .then((snap) => {
                const roomUid = snap.val();
                if (roomUid) {
                    return reach().getRoom(roomUid);
                }
                return reject();
            })
            .then((room) => {
                if (room) {
                    return resolve(room);
                }
                return reject();
            })
            .catch((error) => {
                throw error;
            });
    });

}
