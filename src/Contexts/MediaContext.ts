import { Image } from 'react-native';
import { Dimension } from '../Shared/Types';

export class MediaContext {
    private mediaSizes: { [url: string]: Dimension } = {};
    private static sharedInstance: MediaContext;

    private constructor() { }

    public static getInstance() {
        if (MediaContext.sharedInstance === undefined) {
            MediaContext.sharedInstance = new MediaContext();
        }
        return MediaContext.sharedInstance;
    }

    public fetchImageSize(url: string, onSuccess: (width: number, height: number) => void, onFailure: (error: any) => void) {
        let cache = this.getSize(url);
        if (cache) {
            onSuccess(cache.width, cache.height);
        } else {
            Image.getSize(
                url,
                (width, height) => {
                    this.cacheSize(url, { width: width, height: height });
                    onSuccess(width, height);
                },
                onFailure
            );
        }
    }

    public cacheSize(url: string, size: Dimension) {
        this.mediaSizes[url] = size;
    }

    public getSize(url: string) {
        return this.mediaSizes[url];
    }
}
