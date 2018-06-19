import { AbstractElement } from '../Schema/Base/AbstractElement';
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

export class StyleManager {
    public getStyle(element: AbstractElement) {
        let elementConfig = element.getStyleConfig();
        return {
            alignSelf: HostConfigManager.getInstance().getHorizontalAlignment(elementConfig.horizontalAlignment),
            color: this.getColor(elementConfig.color, elementConfig.isSubtle),
            flex: 1,
            fontSize: HostConfigManager.getInstance().getFontSize(elementConfig.fontSize),
            imgSize: HostConfigManager.getInstance().getImgSize(elementConfig.imgSize),
            fontWeight: HostConfigManager.getInstance().getFontWeight(elementConfig.fontWeight),
            marginTop: HostConfigManager.getInstance().getSpacing(elementConfig.spacing),
            columnWidth: HostConfigManager.getInstance().getColumnWidth(elementConfig.columnWidth),
            wrap: elementConfig.wrap,
        };
    }

    private getColor(color: string, isSubtle: boolean) {
        if (isSubtle) {
            return HostConfigManager.getInstance().getSubtleColor(color);
        }
        return HostConfigManager.getInstance().getColor(color);
    }
}
