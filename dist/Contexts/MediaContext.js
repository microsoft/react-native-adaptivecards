import { Image } from 'react-native';
export class MediaContext {
    constructor() {
        this.mediaSizes = {};
    }
    static getInstance() {
        if (MediaContext.sharedInstance === undefined) {
            MediaContext.sharedInstance = new MediaContext();
        }
        return MediaContext.sharedInstance;
    }
    fetchImageSize(url, onSuccess, onFailure) {
        let cache = this.getSize(url);
        if (cache) {
            onSuccess(cache.width, cache.height);
        }
        else {
            Image.getSize(url, (width, height) => {
                this.cacheSize(url, { width: width, height: height });
                onSuccess(width, height);
            }, onFailure);
        }
    }
    cacheSize(url, size) {
        this.mediaSizes[url] = size;
    }
    getSize(url) {
        return this.mediaSizes[url];
    }
}
