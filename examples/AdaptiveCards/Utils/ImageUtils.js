import { MediaContext } from '../Contexts/MediaContext';
export class ImageUtils {
    static fetchSize(url, onSuccess, onFailure) {
        MediaContext.getInstance().fetchImageSize(url, onSuccess, onFailure);
    }
    static fetchSetSize(urls, contract, sizeConfig, onSuccess, onFailure) {
        Promise.all(urls.map(ImageUtils.fetchSizeAsync)).then((dimensions) => {
            let result = dimensions.reduce((prev, current) => {
                let fitSize = ImageUtils.calcSize(current, contract, sizeConfig, 'h');
                if (fitSize.width === 0 || fitSize.height === 0) {
                    return prev;
                }
                let finalSize = {
                    width: fitSize.width,
                    height: fitSize.height,
                };
                let ratio = ImageUtils.calcRatio(current);
                if (finalSize.width > contract.width) {
                    finalSize.width = contract.width;
                }
                finalSize.height = finalSize.width * ratio;
                if (prev.height !== undefined && prev.height !== 0 && finalSize.height > prev.height) {
                    finalSize.height = prev.height;
                }
                return finalSize;
            }, {
                width: 0,
                height: 0,
            });
            onSuccess(result.width, result.height);
        });
    }
    static fetchSizeAsync(url) {
        return new Promise((resolve) => MediaContext.getInstance().fetchImageSize(url, (width, height) => {
            resolve({ width: width, height: height });
        }, (error) => {
            resolve({ width: 0, height: 0 });
        }));
    }
    static calcSize(imgSize, containerSize, sizeConfig, fitAxis) {
        if (sizeConfig === 'auto') {
            return ImageUtils.calcAutoSize(imgSize, containerSize);
        }
        else if (sizeConfig === 'stretch') {
            return ImageUtils.calcStretchSize(imgSize, containerSize, fitAxis);
        }
        else {
            return ImageUtils.calcFixSize(imgSize, sizeConfig, fitAxis);
        }
    }
    static calcFixSize(imgSize, fixSize, fitAxis) {
        let ratio = ImageUtils.calcRatio(imgSize);
        if (fitAxis === 'v') {
            return {
                height: fixSize,
                width: ratio > 0 ? fixSize / ratio : fixSize
            };
        }
        else {
            return {
                width: fixSize,
                height: fixSize * ratio
            };
        }
    }
    static calcStretchSize(imgSize, containerSize, fitAxis) {
        let ratio = ImageUtils.calcRatio(imgSize);
        if (fitAxis === 'v') {
            if (containerSize.height) {
                let finalSize = {
                    height: containerSize.height,
                    width: ratio > 0 ? containerSize.height / ratio : containerSize.height,
                };
                return finalSize;
            }
        }
        else {
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
    static calcAutoSize(imgSize, containerSize) {
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
    static fitSize(imgSize, containerSize, maxSize, fitAxis) {
        let finalSize = {
            width: imgSize.width,
            height: imgSize.height,
        };
        let contract = ImageUtils.getContract(containerSize, maxSize);
        if (imgSize.width && imgSize.height) {
            let ratio = ImageUtils.calcRatio(imgSize);
            if (fitAxis === 'v') {
                if (contract.height && finalSize.height > contract.height) {
                    finalSize.height = contract.height;
                }
                finalSize.width = ratio > 0 ? finalSize.height / ratio : finalSize.width;
                if (contract.width && finalSize.width > contract.width) {
                    finalSize.width = contract.width;
                    finalSize.height = contract.width * ratio;
                }
            }
            else {
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
    static calcRatio(size) {
        return size.width > 0 ? size.height / size.width : 0;
    }
    static getContract(containerSize, maxSize) {
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
