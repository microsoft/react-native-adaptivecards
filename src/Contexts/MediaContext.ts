export class MediaContext {
    private mediaDimensions: { [url: string]: { width: number, height: number } } = {};
    private static sharedInstance: MediaContext;

    private constructor() { }

    public static getInstance() {
        if (MediaContext.sharedInstance === undefined) {
            MediaContext.sharedInstance = new MediaContext();
        }
        return MediaContext.sharedInstance;
    }

    public cacheDimension(url: string, dimension: { width: number, height: number }) {
        this.mediaDimensions[url] = dimension;
    }

    public fetchDimension(url: string) {
        return this.mediaDimensions[url];
    }
}
