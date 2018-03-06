import cache from './cache';
import Promise from 'promise';

/**
 * Write method
 * @param {string} method Write method (set,update)
 * @param {string} path The path to set
 * @param {object} data The data to set
 * @ignore
 */
const _write = (method, path, data) => {
    return new Promise((resolve, reject) => {
        cache.base.child(path)[method](data, error => error ? reject(error) : resolve());
    });
};

/**
 * {@link Webcom#set} as a {@link Promise}
 * @access protected
 * @param {string} path The path to set
 * @param {object} data The data to set
 * @return {Promise<*, Error>}
 */
export const set = _write.bind(undefined, 'set');

/**
 * {@link Webcom#update} as a {@link Promise}
 * @access protected
 * @param {string} path The path to update
 * @param {object} data The data to update
 * @return {Promise<*, Error>}
 */
export const update = _write.bind(undefined, 'update');


/**
 *
 * @param path
 * @param type
 */
export const once = (path, type) => (
    new Promise((resolve, reject) => {
        cache.base.child(path).once(type, resolve, reject);
    })
);

/**
 *
 * @param path
 * @param type
 * @param queryCallback
 * @param cancelCallback
 */
export const on = (path, type, queryCallback, cancelCallback) => {
    cache.base.child(path).on(type, queryCallback, cancelCallback);
};

/**
 *
 * @param path
 * @param data
 */
export const push = (path, data) => new Promise((resolve, reject) => {
    const pushRef = cache.base.child(path).push(data, error => error ? reject(error) : resolve(pushRef));
});

/**
 *
 * @param path
 */
export const onDisconnect = (path) => (
    cache.base.child(path).onDisconnect()
);

/**
 *
 * @param path
 */
export const get = path => once(path, 'value');

/**
 *
 */
export const ts = () => ( Date.now() );