import { ColumnWidth, FontSize, FontWeight, HorizontalAlignment, ImageSize, Spacing, TextColor } from '../Shared/Enums';
export var SizeModeCode;
(function (SizeModeCode) {
    SizeModeCode[SizeModeCode["Auto"] = -1] = "Auto";
    SizeModeCode[SizeModeCode["Stretch"] = -2] = "Stretch";
})(SizeModeCode || (SizeModeCode = {}));
export class HostConfigManager {
    constructor() {
    }
    static getInstance() {
        if (HostConfigManager.sharedInstance === undefined) {
            HostConfigManager.sharedInstance = new HostConfigManager();
        }
        return HostConfigManager.sharedInstance;
    }
    getDefaultStyle() {
        return {
            textAlign: this.getTextAlignment(HorizontalAlignment.Center),
            alignSelf: this.getSelfAlignment(HorizontalAlignment.Center),
            color: this.getColor(TextColor.Default),
            flex: 1,
            fontSize: this.getFontSize(FontSize.Default),
            imgSize: this.getImgSize(ImageSize.Auto),
            fontWeight: this.getFontWeight(FontWeight.Default),
            marginTop: this.getSpacing(Spacing.Default),
            columnWidth: this.getColumnWidth(ColumnWidth.Auto),
            wrap: true,
        };
    }
    getColor(color) {
        switch (color) {
            case TextColor.Accent:
                return '#2E89FC';
            case TextColor.Attention:
                return '#FF0000';
            case TextColor.Dark:
                return '#000000';
            case TextColor.Default:
                return '#333333';
            case TextColor.Good:
                return '#54a254';
            case TextColor.Light:
                return '#FFFFFF';
            case TextColor.Warning:
                return '#c3ab23';
            default:
                return this.getColor(TextColor.Default);
        }
    }
    getSubtleColor(color) {
        switch (color) {
            case TextColor.Accent:
                return '#2E89FC88';
            case TextColor.Attention:
                return '#FF0000DD';
            case TextColor.Dark:
                return '#00000066';
            case TextColor.Default:
                return '#333333EE';
            case TextColor.Good:
                return '#54a254DD';
            case TextColor.Light:
                return '#00000033';
            case TextColor.Warning:
                return '#c3ab23dd';
            default:
                return this.getSubtleColor(TextColor.Default);
        }
    }
    getFontSize(size) {
        switch (size) {
            case FontSize.Default:
                return 14;
            case FontSize.ExtraLarge:
                return 26;
            case FontSize.Large:
                return 21;
            case FontSize.Medium:
                return 17;
            case FontSize.Small:
                return 12;
            default:
                return this.getFontSize(FontSize.Default);
        }
    }
    getFontWeight(weight) {
        switch (weight) {
            case FontWeight.Bolder:
                return '600';
            case FontWeight.Default:
                return '400';
            case FontWeight.Lighter:
                return '200';
            default:
                return this.getFontWeight(FontWeight.Default);
        }
    }
    getImgSize(size) {
        switch (size) {
            case ImageSize.Auto:
                return 'auto';
            case ImageSize.Large:
                return 160;
            case ImageSize.Medium:
                return 80;
            case ImageSize.Small:
                return 40;
            case ImageSize.Stretch:
                return 'stretch';
            default:
                return this.getImgSize(ImageSize.Auto);
        }
    }
    getSpacing(spacing) {
        switch (spacing) {
            case Spacing.Default:
                return 8;
            case Spacing.ExtraLarge:
                return 40;
            case Spacing.Large:
                return 30;
            case Spacing.Medium:
                return 20;
            case Spacing.None:
                return 0;
            case Spacing.Padding:
                return 10;
            case Spacing.Small:
                return 3;
            default:
                return this.getSpacing(Spacing.Default);
        }
    }
    getTextAlignment(align) {
        switch (align) {
            case HorizontalAlignment.Center:
                return 'center';
            case HorizontalAlignment.Left:
                return 'left';
            case HorizontalAlignment.Right:
                return 'right';
            default:
                return this.getTextAlignment(HorizontalAlignment.Center);
        }
    }
    getInboxTextAlignment(align) {
        switch (align) {
            case HorizontalAlignment.Center:
                return 'center';
            case HorizontalAlignment.Left:
                return 'flex-start';
            case HorizontalAlignment.Right:
                return 'flex-end';
            case ImageSize.Stretch:
                return 'space-between';
            default:
                return this.getInboxTextAlignment(HorizontalAlignment.Left);
        }
    }
    getSelfAlignment(align) {
        switch (align) {
            case HorizontalAlignment.Center:
                return 'center';
            case HorizontalAlignment.Left:
                return 'flex-start';
            case HorizontalAlignment.Right:
                return 'flex-end';
            case ImageSize.Stretch:
                return 'stretch';
            default:
                return this.getSelfAlignment(HorizontalAlignment.Center);
        }
    }
    getColumnWidth(width) {
        if (typeof width === 'number') {
            return width;
        }
        switch (width) {
            case ColumnWidth.Auto:
                return 'auto';
            case ColumnWidth.Stretch:
                return 'stretch';
            default:
                return this.getColumnWidth(ColumnWidth.Auto);
        }
    }
    getWrap(wrap) {
        return wrap ? 'wrap' : 'nowrap';
    }
}
