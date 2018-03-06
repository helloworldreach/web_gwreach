import Webcom from 'webcom/webcom';
import config from '../config';

let _cache = null;
const { datasync } = config;

class CacheManager {
    constructor() {
        if (!_cache) {
            _cache = this;
        }
        this._base = new Webcom(`${datasync.protocol}://${datasync.server}/base/${datasync.namespace}`);
        return _cache;
    }

    /**
     * Get datasync base object
     *
     * @returns {Webcom|*}
     */
    get base() {
        return this._base;
    }
}

const cache = new CacheManager();

export default cache;