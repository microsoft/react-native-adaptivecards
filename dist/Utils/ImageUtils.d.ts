import { Dimension } from '../Shared/Types';
export declare class ImageUtils {
    static fetchSize(url: string, size: 'auto' | 'stretch' | 'small' | 'medium' | 'large', contract: Dimension, onSize: (size: Dimension) => void, onError: (error: any) => void): void;
    static fetchSizeFromConfig(size: 'auto' | 'stretch' | 'small' | 'medium' | 'large', contract: Dimension, onSize: (size: Dimension) => void): void;
    static fetchSizeFromImage(url: string, size: 'auto' | 'stretch' | 'small' | 'medium' | 'large', contract: Dimension, onSize: (size: Dimension) => void, onError: (error: any) => void): void;
    static fitContract(size: Dimension, contract: Dimension): Dimension;
}
