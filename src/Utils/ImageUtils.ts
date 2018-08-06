import { MediaContext } from '../Contexts/MediaContext';
import { Dimension } from '../Shared/Types';

export class ImageUtils {
    public static fetchSize(url: string, onSuccess: (width: number, height: number) => void, onFailure: (error: any) => void) {
        MediaContext.getInstance().fetchImageSize(url, onSuccess, onFailure);
    }

    public static fetchSetSize(urls: string[], contract: Dimension, sizeConfig: 'auto' | 'stretch' | number,
        onSuccess: (width: number, height: number) => void, onFailure: (error: any) => void) {
        Promise.all(urls.map(ImageUtils.fetchSizeAsync)).then((dimensions) => {
            let result = dimensions.reduce(
                (prev, current) => {
                    let fitSize = ImageUtils.calcSize(current, contract, sizeConfig);
                    if (fitSize.width === 0 || fitSize.height === 0) {
                        return prev;
                    }
                    let finalSize = {
                        width: fitSize.width,
                        height: fitSize.height,
                    };
                    let ratio = ImageUtils.calcRatio(current);
                    if (contract.height > 0 && finalSize.height > contract.height) {
                        finalSize.height = contract.height;
                    }
                    if (ratio === 0) {
                        finalSize.width = finalSize.height;
                    } else {
                        finalSize.width = finalSize.height / ratio;
                    }
                    if (prev.width !== undefined && prev.width !== 0 && finalSize.width > prev.width) {
                        finalSize.width = prev.width;
                    }
                    return finalSize;
                },
                {
                    width: 0,
                    height: 0,
                }
            );
            onSuccess(result.width, result.height);
        });
    }

    public static fetchSizeAsync(url: string): Promise<Dimension> {
        return new Promise((resolve) =>
            MediaContext.getInstance().fetchImageSize(url, (width, height) => {
                resolve({ width: width, height: height });
            }, (error: any) => {
                resolve({ width: 0, height: 0 });
            })
        );
    }

    public static calcSize(imgSize: Dimension, containerSize: Dimension, sizeConfig: 'auto' | 'stretch' | number) {
        if (sizeConfig === 'auto') {
            return ImageUtils.calcAutoSize(imgSize, containerSize);
        } else if (sizeConfig === 'stretch') {
            return ImageUtils.calcStretchSize(imgSize, containerSize);
        } else {
            return ImageUtils.calcFixSize(imgSize, sizeConfig);
        }
    }

    public static calcFixSize(imgSize: Dimension, fixSize: number) {
        let ratio = ImageUtils.calcRatio(imgSize);
        if (ratio < 1) {
            return {
                height: fixSize,
                width: ratio > 0 ? fixSize / ratio : fixSize
            };
        } else {
            return {
                width: fixSize,
                height: fixSize * ratio
            };
        }
    }

    public static calcStretchSize(imgSize: Dimension, containerSize: Dimension) {
        let ratio = ImageUtils.calcRatio(imgSize);
        if (ratio < 1) {
            if (containerSize.height) {
                let finalSize = {
                    height: containerSize.height,
                    width: ratio > 0 ? containerSize.height / ratio : containerSize.height,
                };
                return finalSize;
            }
        } else {
            if (containerSize.width) {
                let finalSize = {
                    width: containerSize.width,
                    height: containerSize.width * ratio,
                };
                return finalSize;
            }
        }
        return imgSize;
    }

    public static calcAutoSize(imgSize: Dimension, containerSize: Dimension) {
        let ratio = ImageUtils.calcRatio(imgSize);
        let finalSize = {
            width: imgSize.width,
            height: imgSize.height,
        };
        if (finalSize.width > containerSize.width) {
            finalSize.width = containerSize.width;
        }
        finalSize.height = finalSize.width * ratio;
        return finalSize;
    }

    public static fitSize(imgSize: Dimension, containerSize: Dimension, maxSize: Dimension) {
        let finalSize = {
            width: imgSize.width,
            height: imgSize.height,
        };
        let contract = ImageUtils.getContract(containerSize, maxSize);

        if (imgSize.width && imgSize.height) {
            let ratio = ImageUtils.calcRatio(imgSize);
            if (ratio < 1) {
                // Fit based on height if fitAxis is 'v'
                if (contract.height && finalSize.height > contract.height) {
                    finalSize.height = contract.height;
                }
                finalSize.width = ratio > 0 ? finalSize.height / ratio : finalSize.width;
                if (contract.width && finalSize.width > contract.width) {
                    finalSize.width = contract.width;
                    finalSize.height = contract.width * ratio;
                }
            } else {
                // Fit based on width if fitAxis is undefined or 'h'
                if (contract.width && finalSize.width > contract.width) {
                    finalSize.width = contract.width;
                }
                finalSize.height = finalSize.width * ratio;
                if (contract.height && finalSize.height > contract.height) {
                    finalSize.height = contract.height;
                    finalSize.width = ratio > 0 ? finalSize.height / ratio : finalSize.width;
                }
            }
        }
        return finalSize;
    }

    private static calcRatio(size: Dimension) {
        return size.width > 0 ? size.height / size.width : 0;
    }

    private static getContract(containerSize: Dimension, maxSize: Dimension) {
        let contract = {
            width: containerSize.width,
            height: containerSize.height,
        };
        if (contract.width > maxSize.width) {
            contract.width = maxSize.width;
        }
        contract.height = maxSize.height;

        return contract;
    }
}
