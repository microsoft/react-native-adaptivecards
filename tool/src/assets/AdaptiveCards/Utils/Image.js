import { Image } from 'react-native';
import { StyleManager } from '../Styles/StyleManager';
import { UrlUtils } from './Url';
export class ImageUtils {
    static fetchSize(url, size, contract, config, onSize, onError) {
        if (UrlUtils.isSvgXml(url) || UrlUtils.isDeepLink(url)) {
            ImageUtils.fetchSizeFromConfig(size, contract, config, onSize);
        }
        else {
            let baseUrl = '';
            if (config) {
                baseUrl = config.baseUrl;
            }
            ImageUtils.fetchSizeFromImage(UrlUtils.toAbsolute(url, baseUrl), size, contract, config, onSize, onError);
        }
    }
    static fetchSizeFromConfig(size, contract, config, onSize) {
        let width = StyleManager.getImageSize(size, config);
        if (typeof width !== 'number') {
            width = StyleManager.getImageSize('large', config);
        }
        if (onSize) {
            onSize(ImageUtils.fitContract({ width: width, height: width }, contract, config));
        }
    }
    static fetchSizeFromImage(url, size, contract, config, onSize, onError) {
        Image.getSize(url, (width, height) => {
            if (width && height && width > 0 && height > 0) {
                let basis = StyleManager.getImageSize(size, config);
                let result = {
                    width: width,
                    height: height,
                };
                if (typeof basis === 'number') {
                    let ratio = result.width / result.height;
                    if (ratio > 1) {
                        result.height = basis;
                        result.width = basis * ratio;
                    }
                    else {
                        result.width = basis;
                        result.height = basis / ratio;
                    }
                }
                if (onSize) {
                    onSize(ImageUtils.fitContract(result, contract, config));
                }
            }
        }, onError);
    }
    static fitContract(size, contract, config) {
        if (contract) {
            if (size && size.width && size.height && size.width > 0 && size.height > 0) {
                let ratio = size.width / size.height;
                let result = {
                    width: size.width,
                    height: size.height,
                };
                if (contract.height && result.height > contract.height) {
                    result.height = contract.height;
                    result.width = result.height * ratio;
                }
                if (contract.width && result.width > contract.width) {
                    result.width = contract.width;
                    result.height = result.width / ratio;
                }
                return result;
            }
            return contract;
        }
        else {
            if (size && size.width && size.height && size.width > 0 && size.height > 0) {
                return size;
            }
            else {
                let width = StyleManager.getImageSize('large', config);
                return {
                    width: width,
                    height: width,
                };
            }
        }
    }
}
