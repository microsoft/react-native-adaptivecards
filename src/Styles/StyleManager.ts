import { AbstractElement } from '../Schema/Base/AbstractElement';
import { ImageSize } from '../Shared/Enums';
import { HostConfigManager } from './HostConfig';

export interface ElementStyleConfig {
    color?: string;
    fontSize?: string;
    imgSize?: string;
    style?: string;
    horizontalAlignment?: string;
    isSubtle?: boolean;
    fontWeight?: string;
    wrap?: boolean;
    spacing?: string;
    columnWidth?: string | number;
}

export interface StyleConfig {
    textAlign: 'auto' | 'left' | 'right' | 'center' | 'justify';
    alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    color: string;
    flex: number;
    fontSize: number;
    imgSize: number | 'auto' | 'stretch';
    fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    spacing: number;
    columnWidth: number | 'auto' | 'stretch';
    wrap: 'wrap' | 'nowrap';
}

export class StyleManager {
    private static sharedInstance: StyleManager;

    private constructor() { }

    public static getInstance() {
        if (StyleManager.sharedInstance === undefined) {
            StyleManager.sharedInstance = new StyleManager();
        }
        return StyleManager.sharedInstance;
    }

    public getStyle(element: AbstractElement): StyleConfig {
        let elementConfig = element.getStyleConfig();
        let style = {
            textAlign: HostConfigManager.getInstance().getTextAlignment(elementConfig.horizontalAlignment),
            alignSelf: HostConfigManager.getInstance().getSelfAlignment(elementConfig.horizontalAlignment),
            color: this.getColor(elementConfig.color, elementConfig.isSubtle),
            flex: 1,
            fontSize: HostConfigManager.getInstance().getFontSize(elementConfig.fontSize),
            imgSize: HostConfigManager.getInstance().getImgSize(elementConfig.imgSize),
            fontWeight: HostConfigManager.getInstance().getFontWeight(elementConfig.fontWeight),
            spacing: HostConfigManager.getInstance().getSpacing(elementConfig.spacing),
            columnWidth: HostConfigManager.getInstance().getColumnWidth(elementConfig.columnWidth),
            wrap: HostConfigManager.getInstance().getWrap(elementConfig.wrap),
        };
        if (elementConfig.imgSize === ImageSize.Stretch) {
            style.alignSelf = HostConfigManager.getInstance().getSelfAlignment(ImageSize.Stretch);
        }
        return style;
    }

    private getColor(color: string, isSubtle: boolean) {
        if (isSubtle) {
            return HostConfigManager.getInstance().getSubtleColor(color);
        }
        return HostConfigManager.getInstance().getColor(color);
    }
}
