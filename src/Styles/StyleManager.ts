import { HostConfig } from 'HostConfig/Types';
import { HostConfigManager } from '../HostConfig/HostConfigManager';
import { ImageElement } from '../Schema/CardElements/Image';
import { TextBlockElement } from '../Schema/CardElements/TextBlock';
import { ColumnElement } from '../Schema/Containers/Column';
import { ImageSetElement } from '../Schema/Containers/ImageSet';
import { StyleTransformer } from './StyleTransformer';
import { ActionContainerStyle, ActionStyle, ImageSetStyle, ImageStyle, ShowCardStyle, TextBlockStyle } from './Types';

export class StyleManager {
    private hostConfig: HostConfig;
    private static sharedInstance: StyleManager;

    private constructor(hostConfig: HostConfig) {
        this.hostConfig = hostConfig;
    }

    public static getInstance(hostConfig?: HostConfig) {
        let config = hostConfig;
        if (config === undefined) {
            config = HostConfigManager.getInstance().getDefaultConfig();
        }
        if (StyleManager.sharedInstance === undefined) {
            StyleManager.sharedInstance = new StyleManager(config);
        }
        return StyleManager.sharedInstance;
    }

    public setConfig(hostConfig: HostConfig) {
        if (this.hostConfig) {
            this.hostConfig.combine(hostConfig);
        } else {
            this.hostConfig = hostConfig;
        }
    }

    public getActionContainerStyle(): ActionContainerStyle {
        let result: ActionContainerStyle = {
            align: 'flex-start',
            direction: 'row',
        };
        if (this.hostConfig) {
            result.align = StyleTransformer.transformAlign(this.hostConfig.action.align);
            result.direction = StyleTransformer.transformDirection(this.hostConfig.action.direction);
        }
        return result;
    }

    public getActionStyle(): ActionStyle {
        let result: ActionStyle = {
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

    public getImageStyle(element: ImageElement) {
        let result: ImageStyle = {
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

    public getImageSize(size: 'small' | 'medium' | 'large' | 'auto' | 'stretch') {
        if (this.hostConfig) {
            return StyleTransformer.transformImageSize(size, this.hostConfig);
        } else {
            return StyleTransformer.transformImageSize(size, HostConfigManager.getInstance().getDefaultConfig());
        }
    }

    public getTextStyle(element: TextBlockElement, theme: 'default' | 'emphasis') {
        let result: TextBlockStyle = {
            color: '#000',
            fontFamily: 'FullMDL2',
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
            inboxTextAlign: 'center',
            // TODO:: Check TextBlock default wrap
            wrap: 'nowrap',
            spacing: 0,
        };
        if (element) {
            if (this.hostConfig) {
                result.fontFamily = this.hostConfig.fontFamily;
            }
            // TODO:: Find a way to identify if the TextBlock is in emphasis container
            result.color = StyleTransformer.transformColor(element.color, element.isSubtle, theme, this.hostConfig);
            result.fontSize = StyleTransformer.transformFontSize(element.size, this.hostConfig);
            result.fontWeight = StyleTransformer.transformFontWeight(element.weight, this.hostConfig);
            result.spacing = StyleTransformer.transformSpacing(element.spacing, this.hostConfig);
            result.textAlign = StyleTransformer.transformTextAlign(element.horizontalAlignment);
            result.inboxTextAlign = StyleTransformer.transformInboxTextAlign(element.horizontalAlignment);
            result.wrap = element.wrap ? 'wrap' : 'nowrap';
        }
        return result;
    }

    public getColor(color: 'default' | 'dark' | 'light' | 'accent' | 'good' | 'warning' | 'attention',
        subtle: boolean, theme: 'default' | 'emphasis') {
        if (this.hostConfig) {
            return StyleTransformer.transformColor(color, subtle, theme, this.hostConfig);
        } else {
            return StyleTransformer.transformColor(color, subtle, theme, HostConfigManager.getInstance().getDefaultConfig());
        }
    }

    public getBackgroundColor(theme: 'default' | 'emphasis') {
        if (this.hostConfig) {
            return StyleTransformer.transformBackgroundColor(theme, this.hostConfig);
        } else {
            return StyleTransformer.transformBackgroundColor(theme, HostConfigManager.getInstance().getDefaultConfig());
        }
    }

    public getSpacing(spacing: 'none' | 'default' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding') {
        if (this.hostConfig) {
            return StyleTransformer.transformSpacing(spacing, this.hostConfig);
        } else {
            return StyleTransformer.transformSpacing(spacing, HostConfigManager.getInstance().getDefaultConfig());
        }
    }

    public getImageSetStyle(element: ImageSetElement) {
        let result: ImageSetStyle = {
            imageSize: 'auto',
            spacing: 0,
        };
        if (element) {
            result.imageSize = StyleTransformer.transformImageSize(element.imageSize, this.hostConfig);
            result.spacing = StyleTransformer.transformSpacing(element.spacing, this.hostConfig);
        }
        return result;
    }

    public getColumnWidth(element: ColumnElement): number | 'auto' | 'stretch' {
        if (element) {
            return StyleTransformer.transformColumnWidth(element.width);
        }
        return 'auto';
    }

    public getShowCardStyle() {
        let result: ShowCardStyle = {
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
