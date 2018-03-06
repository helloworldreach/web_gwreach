import Reach from 'webcom-reach';
import config from '../config';

let ref;
const { datasync } = config;
const stores = {};

const reach = () => {
    if(!ref) {
        const
            logLevel = process.env.NODE_ENV === 'development' ? 'DEBUG' : 'ERROR',
            preferredAudioCodec = Reach.codecs.audio.OPUS,
            preferredVideoCodec = Reach.codecs.video.VP8,
            audioConstraints = {
                optional:[
                    {googEchoCancellation: true},
                    {googAutoGainControl: true},
                    {googNoiseReduction: true}
                ],
                mandatory:{}
            },
            constraints = Reach.media.constraints('HD', audioConstraints),
            iceServers = [
                {
                    username: 'admin',
                    credential: 'webcom1234',
                    urls: [
                        'turns:turn1.webcom.orange.com:443',
                        'turns:webcom1.orange-labs.fr:443',
                        'turn:turn1.webcom.orange.com:3478'
                    ]
                }
            ];

        // Force framerate
        constraints.video = Object.assign(constraints.video, {frameRate: {ideal: 10, max: 25}});

        ref = new Reach(`${datasync.protocol}://${datasync.server}/base/${datasync.namespace}`, {
            logLevel,
            constraints,
            preferredAudioCodec,
            preferredVideoCodec,
            iceServers
        });
    }
    return ref;
};

class _Store {
    constructor(type) {
        if(!stores[type]) {
            stores[type] = this;
        }
        this._data = {};
        return stores[type];
    }
    add(o) {
        if(o) {
            this._data[o.uid] = o;
        }
    }
    find(o) {
        return o ? this._data[o.uid || o] : null;
    }
    remove(o) {
        if(o) {
            delete this._data[o.uid || o];
        }
    }
}

const
    rooms = new _Store('rooms'),
    invites = new _Store('invites'),
    streams = new _Store('streams'),
    users = new _Store('users');

export default reach;
export {rooms, invites, streams, users};
