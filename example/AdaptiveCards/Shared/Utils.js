import { MediaContext } from '../Contexts/MediaContext';
export class JsonUtils {
    static isValidValue(value) {
        return !(value === undefined ||
            value === null ||
            (typeof value === 'string' && !value));
    }
}
export class NumberUtils {
    static isInRange(value, min, max) {
        console.log('Range: ' + min + ' --- ' + max);
        console.log('Value: ' + value);
        if (value !== undefined && min !== undefined && max !== undefined) {
            console.log('Check full range');
            return (value >= min && value <= max);
        }
        if (value !== undefined && min !== undefined) {
            console.log('Check min range');
            return (value >= min);
        }
        if (value !== undefined && max !== undefined) {
            console.log('Check ax range');
            return (value <= max);
        }
        return true;
    }
    static isNumberStrict(value) {
        return /^(\+|-)?\d+($|\.\d+$)/.test(value);
    }
    static isNumber(value) {
        return /^(\+|-)?\d+($|\.\d*$)/.test(value);
    }
    static isSymbol(value) {
        return /^(\+|-)?$/.test(value);
    }
}
export class EnumUtils {
    static getEnumValueOrDefault(targetEnum, name, defaultValue) {
        if (!name) {
            return defaultValue;
        }
        for (const key in targetEnum) {
            if (targetEnum.hasOwnProperty(key)) {
                let isValueProperty = parseInt(key, 10) >= 0;
                if (isValueProperty) {
                    let value = targetEnum[key];
                    if (value && typeof value === 'string') {
                        if (value.toLowerCase() === name.toLowerCase()) {
                            return parseInt(key, 10);
                        }
                    }
                }
            }
        }
        return defaultValue;
    }
    static getStringEnumValueOrDefault(targetEnum, name, defaultValue) {
        if (!name) {
            return defaultValue;
        }
        for (const key in targetEnum) {
            if (targetEnum.hasOwnProperty(key)) {
                let value = targetEnum[key];
                if (value.toLowerCase() === name.toLowerCase()) {
                    return value;
                }
            }
        }
        return defaultValue;
    }
}
export class StringUtils {
    static prettifyString(valueString, fix, length, position) {
        if (valueString && valueString.length < length && fix && fix.length > 0) {
            let result = valueString;
            let count = length - valueString.length;
            for (let i = 0; i < count; i++) {
                if (position === 'pre') {
                    result = fix[0] + result;
                }
                else {
                    result = result + fix[0];
                }
            }
            return result;
        }
        return valueString;
    }
}
export class TimeUtils {
    static isDate(value) {
        return /^\d{4}(\-\d{2}){2}$/.test(value);
    }
    static isTime(value) {
        return /^\d{2}\:\d{2}$/.test(value);
    }
    static extractDate(value) {
        if (TimeUtils.isDate(value)) {
            let parts = value.split('-');
            return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        }
        return undefined;
    }
    static extractTime(value) {
        if (TimeUtils.isTime(value)) {
            let parts = value.split(':');
            return new Date(2020, 0, 1, Number(parts[0]), Number(parts[1]));
        }
        return undefined;
    }
    static getDateString(date) {
        if (date) {
            return (`${StringUtils.prettifyString(date.getFullYear().toString(), '0', 2, 'pre')}-` +
                `${StringUtils.prettifyString((date.getMonth() + 1).toString(), '0', 2, 'pre')}-` +
                `${StringUtils.prettifyString(date.getDate().toString(), '0', 2, 'pre')}`);
        }
        return undefined;
    }
    static getTimeString(date) {
        if (date) {
            return TimeUtils.composeTimeString(date.getHours(), date.getMinutes());
        }
        return undefined;
    }
    static composeTimeString(hour, minute) {
        return (`${StringUtils.prettifyString(hour.toString(), '0', 2, 'pre')}:` +
            `${StringUtils.prettifyString(minute.toString(), '0', 2, 'pre')}`);
    }
}
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
