export class MediaContext {
    constructor() {
        this.mediaDimensions = {};
    }
    static getInstance() {
        if (MediaContext.sharedInstance === undefined) {
            MediaContext.sharedInstance = new MediaContext();
        }
        return MediaContext.sharedInstance;
    }
    cacheDimension(url, dimension) {
        this.mediaDimensions[url] = dimension;
    }
    fetchDimension(url) {
        return this.mediaDimensions[url];
    }
}
