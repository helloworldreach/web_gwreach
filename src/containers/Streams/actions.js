import { streams } from '../../utils/reach';
import {
    STREAM_SUBSCRIBING, STREAM_SUBSCRIBED
} from './constant';


export function subscribe(uid) {
    return dispatch => {
        dispatch({
            type: STREAM_SUBSCRIBING,
            subscribed: 'subscribing',
            uid
        });
        const stream = streams.find(uid);
        const videoTag = document.getElementById(`stream-${uid}`);
        return stream.subscribe(videoTag)
            .then(() => {
                return dispatch({
                    type: STREAM_SUBSCRIBED,
                    subscribed: true,
                    uid
                });
            })
    }
}