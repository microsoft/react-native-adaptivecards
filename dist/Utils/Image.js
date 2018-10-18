import { Image } from 'react-native';
import { StyleConfig } from '../Styles/StyleConfig';
import { UrlUtils } from './Url';
export class ImageUtils {
    static fetchSize(url, size, contract, onSize, onError) {
        if (UrlUtils.isSvgXml(url) || UrlUtils.isDeepLink(url)) {
            ImageUtils.fetchSizeFromConfig(size, contract, onSize);
        }
        else {
            ImageUtils.fetchSizeFromImage(UrlUtils.toAbsolute(url), size, contract, onSize, onError);
        }
    }
    static fetchSizeFromConfig(size, contract, onSize) {
        let width = StyleConfig.getImageSize(size);
        if (typeof width !== 'number') {
            width = StyleConfig.getImageSize('large');
        }
        if (onSize) {
            onSize(ImageUtils.fitContract({ width: width, height: width }, contract));
        }
    }
    static fetchSizeFromImage(url, size, contract, onSize, onError) {
        Image.getSize(url, (width, height) => {
            if (width && height && width > 0 && height > 0) {
                let basis = StyleConfig.getImageSize(size);
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
                    onSize(ImageUtils.fitContract(result, contract));
                }
            }
        }, onError);
    }
    static fitContract(size, contract) {
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
                let width = StyleConfig.getImageSize('large');
                return {
                    width: width,
                    height: width,
                };
            }
        }
    }
}
