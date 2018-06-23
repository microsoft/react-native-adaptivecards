import { ImageSize } from '../Shared/Enums';
import { HostConfigManager } from './HostConfig';
export class StyleManager {
    constructor() { }
    static getInstance() {
        if (StyleManager.sharedInstance === undefined) {
            StyleManager.sharedInstance = new StyleManager();
        }
        return StyleManager.sharedInstance;
    }
    getStyle(element) {
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
    getColor(color, isSubtle) {
        if (isSubtle) {
            return HostConfigManager.getInstance().getSubtleColor(color);
        }
        return HostConfigManager.getInstance().getColor(color);
    }
}
