import { Image } from 'react-native';

import { HostConfig } from '../Configs/Types';
import { Dimension } from '../Shared/Types';
import { StyleManager } from '../Styles/StyleManager';
import { UrlUtils } from './Url';

export class ImageUtils {
    // tslint:disable-next-line:max-line-length
    public static fetchSize(url: string, size: 'auto' | 'stretch' | 'small' | 'medium' | 'large', contract: Dimension, config: HostConfig, onSize: (size: Dimension) => void, onError: (error: any) => void) {
        if (UrlUtils.isSvgXml(url) || UrlUtils.isDeepLink(url)) {
            ImageUtils.fetchSizeFromConfig(size, contract, config, onSize);
        } else {
            let baseUrl = '';
            if (config) {
                baseUrl = config.baseUrl;
            }
            ImageUtils.fetchSizeFromImage(UrlUtils.toAbsolute(url, baseUrl), size, contract, config, onSize, onError);
        }
    }

    // tslint:disable-next-line:max-line-length
    public static fetchSizeFromConfig(size: 'auto' | 'stretch' | 'small' | 'medium' | 'large', contract: Dimension, config: HostConfig, onSize: (size: Dimension) => void) {
        let width = StyleManager.getImageSize(size, config);
        if (typeof width !== 'number') {
            width = StyleManager.getImageSize('large', config) as number;
        }

        if (onSize) {
            onSize(ImageUtils.fitContract({width: width, height: width}, contract, config));
        }
    }

    // tslint:disable-next-line:max-line-length
    public static fetchSizeFromImage(url: string, size: 'auto' | 'stretch' | 'small' | 'medium' | 'large', contract: Dimension, config: HostConfig, onSize: (size: Dimension) => void, onError: (error: any) => void) {
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
                    } else {
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

    public static fitContract(size: Dimension, contract: Dimension, config: HostConfig) {
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
        } else {
            if (size && size.width && size.height && size.width > 0 && size.height > 0) {
                return size;
            } else {
                let width = StyleManager.getImageSize('large', config) as number;
                return {
                    width: width,
                    height: width,
                };
            }
        }
    }
}
