import { HostConfigManager } from '../HostConfig/HostConfigManager';
import { StyleTransformer } from './StyleTransformer';
export class StyleManager {
    constructor(hostConfig) {
        this.hostConfig = hostConfig;
    }
    static getInstance(hostConfig) {
        let config = hostConfig;
        if (config === undefined) {
            config = HostConfigManager.getInstance().getDefaultConfig();
        }
        if (StyleManager.sharedInstance === undefined) {
            StyleManager.sharedInstance = new StyleManager(config);
        }
        return StyleManager.sharedInstance;
    }
    setConfig(hostConfig) {
        if (this.hostConfig) {
            this.hostConfig.combine(hostConfig);
        }
        else {
            this.hostConfig = hostConfig;
        }
    }
    getActionContainerStyle() {
        let result = {
            align: 'flex-start',
            direction: 'row',
        };
        if (this.hostConfig) {
            result.align = StyleTransformer.transformAlign(this.hostConfig.action.align);
            result.direction = StyleTransformer.transformDirection(this.hostConfig.action.direction);
        }
        return result;
    }
    getActionStyle() {
        let result = {
            marginTop: 10,
            marginLeft: 10,
            iconPosition: 'LeftOfTitle',
            iconSize: 18,
        };
        if (this.hostConfig) {
            result.marginTop = StyleTransformer.transformSpacing(this.hostConfig.action.spacing, this.hostConfig);
            result.marginLeft = this.hostConfig.action.actionSpacing;
            result.iconPosition = this.hostConfig.action.iconPosition;
            result.iconSize = this.hostConfig.action.iconSize;
        }
        return result;
    }
    getImageStyle(element) {
        let result = {
            align: 'stretch',
            size: 'auto',
            spacing: 0,
        };
        if (element) {
            result.size = StyleTransformer.transformImageSize(element.size, this.hostConfig);
            result.spacing = StyleTransformer.transformSpacing(element.spacing, this.hostConfig);
            result.align = StyleTransformer.transformAlign(element.horizontalAlignment);
        }
        if (result.size === 'stretch') {
            result.align = 'stretch';
        }
        return result;
    }
    getImageSize(size) {
        if (this.hostConfig) {
            return StyleTransformer.transformImageSize(size, this.hostConfig);
        }
        else {
            return StyleTransformer.transformImageSize(size, HostConfigManager.getInstance().getDefaultConfig());
        }
    }
    getTextStyle(element, theme) {
        let result = {
            color: '#000',
            fontFamily: 'FullMDL2',
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
            wrap: 'nowrap',
            spacing: 0,
        };
        if (element) {
            if (this.hostConfig) {
                result.fontFamily = this.hostConfig.fontFamily;
            }
            result.color = StyleTransformer.transformColor(element.color, element.isSubtle, theme, this.hostConfig);
            result.fontSize = StyleTransformer.transformFontSize(element.size, this.hostConfig);
            result.fontWeight = StyleTransformer.transformFontWeight(element.weight, this.hostConfig);
            result.spacing = StyleTransformer.transformSpacing(element.spacing, this.hostConfig);
            result.textAlign = StyleTransformer.transformTextAlign(element.horizontalAlignment);
            result.wrap = element.wrap ? 'wrap' : 'nowrap';
        }
        return result;
    }
    getFontSize(size) {
        if (this.hostConfig) {
            return StyleTransformer.transformFontSize(size, this.hostConfig);
        }
        else {
            return StyleTransformer.transformFontSize(size, HostConfigManager.getInstance().getDefaultConfig());
        }
    }
    getFontWeight(weight) {
        if (this.hostConfig) {
            return StyleTransformer.transformFontWeight(weight, this.hostConfig);
        }
        else {
            return StyleTransformer.transformFontWeight(weight, HostConfigManager.getInstance().getDefaultConfig());
        }
    }
    getColor(color, subtle, theme) {
        if (this.hostConfig) {
            return StyleTransformer.transformColor(color, subtle, theme, this.hostConfig);
        }
        else {
            return StyleTransformer.transformColor(color, subtle, theme, HostConfigManager.getInstance().getDefaultConfig());
        }
    }
    getBackgroundColor(theme) {
        if (this.hostConfig) {
            return StyleTransformer.transformBackgroundColor(theme, this.hostConfig);
        }
        else {
            return StyleTransformer.transformBackgroundColor(theme, HostConfigManager.getInstance().getDefaultConfig());
        }
    }
    getSpacing(spacing) {
        if (this.hostConfig) {
            return StyleTransformer.transformSpacing(spacing, this.hostConfig);
        }
        else {
            return StyleTransformer.transformSpacing(spacing, HostConfigManager.getInstance().getDefaultConfig());
        }
    }
    getImageSetStyle(element) {
        let result = {
            imageSize: 'auto',
            spacing: 0,
        };
        if (element) {
            result.imageSize = StyleTransformer.transformImageSize(element.imageSize, this.hostConfig);
            result.spacing = StyleTransformer.transformSpacing(element.spacing, this.hostConfig);
        }
        return result;
    }
    getColumnWidth(element) {
        if (element) {
            return StyleTransformer.transformColumnWidth(element.width);
        }
        return 'auto';
    }
    getShowCardStyle() {
        let result = {
            mode: 'Inline',
            margin: 10,
            theme: 'default',
        };
        if (this.hostConfig) {
            result.mode = this.hostConfig.action.showCard.mode;
            result.margin = this.hostConfig.action.showCard.margin;
            result.theme = this.hostConfig.action.showCard.style;
        }
        return result;
    }
}
