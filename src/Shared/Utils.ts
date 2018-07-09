import { MediaContext } from '../Contexts/MediaContext';
import { Dimension } from './Types';

export class JsonUtils {
    public static isValidValue(value: any): boolean {
        return !(value === undefined ||
            value === null ||
            (typeof value === 'string' && !value && value !== ''));
    }
}

export class NumberUtils {
    public static isInRange<T extends number | Date>(value: T, min: T, max: T) {
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

    public static isNumberStrict(value: string) {
        return /^(\+|-)?\d+($|\.\d+$)/.test(value);
    }

    public static isNumber(value: string) {
        return /^(\+|-)?\d+($|\.\d*$)/.test(value);
    }

    public static isSymbol(value: string) {
        return /^(\+|-)?$/.test(value);
    }
}

export class EnumUtils {
    public static getEnumValueOrDefault(targetEnum: { [s: number]: string }, name: string, defaultValue: number): number {
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

    public static getStringEnumValueOrDefault(targetEnum: any, name: string, defaultValue: string): string {
        if (!name) {
            return defaultValue;
        }

        for (const key in targetEnum) {
            if (targetEnum.hasOwnProperty(key)) {
                let value: string = targetEnum[key];
                if (value.toLowerCase() === name.toLowerCase()) {
                    return value;
                }
            }
        }

        return defaultValue;
    }
}

export class StringUtils {
    public static prettifyString(valueString: string, fix: string, length: number, position: 'pre' | 'post') {
        if (valueString && valueString.length < length && fix && fix.length > 0) {
            let result = valueString;
            let count = length - valueString.length;
            for (let i = 0; i < count; i++) {
                if (position === 'pre') {
                    result = fix[0] + result;
                } else {
                    result = result + fix[0];
                }
            }
            return result;
        }
        return valueString;
    }
}

export class TimeUtils {

    public static isDate(value: string) {
        return /^\d{4}(\-\d{2}){2}$/.test(value);
    }

    public static isTime(value: string) {
        return /^\d{2}\:\d{2}$/.test(value);
    }

    public static extractDate(value: string) {
        if (TimeUtils.isDate(value)) {
            let parts = value.split('-');
            return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        }
        return undefined;
    }

    public static extractTime(value: string) {
        if (TimeUtils.isTime(value)) {
            let parts = value.split(':');
            return new Date(2020, 0, 1, Number(parts[0]), Number(parts[1]));
        }
        return undefined;
    }

    public static getDateString(date: Date) {
        if (date) {
            return (
                `${StringUtils.prettifyString(date.getFullYear().toString(), '0', 2, 'pre')}-` +
                `${StringUtils.prettifyString((date.getMonth() + 1).toString(), '0', 2, 'pre')}-` +
                `${StringUtils.prettifyString(date.getDate().toString(), '0', 2, 'pre')}`
            );
        }
        return undefined;
    }

    public static getTimeString(date: Date) {
        if (date) {
            return TimeUtils.composeTimeString(date.getHours(), date.getMinutes());
        }
        return undefined;
    }

    public static composeTimeString(hour: number, minute: number) {
        return (
            `${StringUtils.prettifyString(hour.toString(), '0', 2, 'pre')}:` +
            `${StringUtils.prettifyString(minute.toString(), '0', 2, 'pre')}`
        );
    }
}

export class ImageUtils {
    public static fetchSize(url: string, onSuccess: (width: number, height: number) => void, onFailure: (error: any) => void) {
        MediaContext.getInstance().fetchImageSize(url, onSuccess, onFailure);
    }

    public static fetchSetSize(urls: string[], contract: Dimension, sizeConfig: 'auto' | 'stretch' | number,
        onSuccess: (width: number, height: number) => void, onFailure: (error: any) => void) {
        Promise.all(urls.map(ImageUtils.fetchSizeAsync)).then((dimensions) => {
            let result = dimensions.reduce(
                (prev, current) => {
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

    public static calcSize(imgSize: Dimension, containerSize: Dimension, sizeConfig: 'auto' | 'stretch' | number, fitAxis: 'h' | 'v') {
        if (sizeConfig === 'auto') {
            return ImageUtils.calcAutoSize(imgSize, containerSize);
        } else if (sizeConfig === 'stretch') {
            return ImageUtils.calcStretchSize(imgSize, containerSize, fitAxis);
        } else {
            return ImageUtils.calcFixSize(imgSize, sizeConfig, fitAxis);
        }
    }

    public static calcFixSize(imgSize: Dimension, fixSize: number, fitAxis: 'h' | 'v') {
        let ratio = ImageUtils.calcRatio(imgSize);
        if (fitAxis === 'v') {
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

    public static calcStretchSize(imgSize: Dimension, containerSize: Dimension, fitAxis: 'h' | 'v') {
        let ratio = ImageUtils.calcRatio(imgSize);
        if (fitAxis === 'v') {
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

    public static fitSize(imgSize: Dimension, containerSize: Dimension, maxSize: Dimension, fitAxis: 'h' | 'v') {
        let finalSize = {
            width: imgSize.width,
            height: imgSize.height,
        };
        let contract = ImageUtils.getContract(containerSize, maxSize);

        if (imgSize.width && imgSize.height) {
            let ratio = ImageUtils.calcRatio(imgSize);
            if (fitAxis === 'v') {
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
