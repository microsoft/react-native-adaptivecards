import { ColumnWidth, FontSize, FontWeight, HorizontalAlignment, ImageSize, Spacing, TextColor } from '../Shared/Enums';
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
            alignSelf: this.getHorizontalAlignment(HorizontalAlignment.Center),
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
                return '#882E89FC';
            case TextColor.Attention:
                return '#DDFF0000';
            case TextColor.Dark:
                return '#66000000';
            case TextColor.Default:
                return '#EE333333';
            case TextColor.Good:
                return '#DD54a254';
            case TextColor.Light:
                return '#33000000';
            case TextColor.Warning:
                return '#DDc3ab23';
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
                return 600;
            case FontWeight.Default:
                return 400;
            case FontWeight.Lighter:
                return 200;
            default:
                return this.getFontWeight(FontWeight.Default);
        }
    }
    getImgSize(size) {
        switch (size) {
            case ImageSize.Auto:
                return ImageSize.Auto;
            case ImageSize.Large:
                return 160;
            case ImageSize.Medium:
                return 80;
            case ImageSize.Small:
                return 40;
            case ImageSize.Stretch:
                return ImageSize.Stretch;
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
    getHorizontalAlignment(align) {
        switch (align) {
            case HorizontalAlignment.Center:
                return 'center';
            case HorizontalAlignment.Left:
                return 'flex-start';
            case HorizontalAlignment.Right:
                return 'flex-end';
            default:
                return this.getHorizontalAlignment(HorizontalAlignment.Center);
        }
    }
    getColumnWidth(width) {
        if (typeof width === 'number') {
            return width;
        }
        switch (width) {
            case ColumnWidth.Auto:
                return ColumnWidth.Auto;
            case ColumnWidth.Stretch:
                return ColumnWidth.Stretch;
            default:
                return this.getColumnWidth(ColumnWidth.Auto);
        }
    }
}
