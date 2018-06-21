import { FlexAlignType } from 'react-native';
import {
    ColumnWidth,
    FontSize,
    FontWeight,
    HorizontalAlignment,
    ImageSize,
    Spacing,
    TextColor
} from '../Shared/Enums';

export class HostConfigManager {
    // TODO: Support load HostConfig for all hard coded value.
    private static sharedInstance: HostConfigManager;

    private constructor() {

    }

    public static getInstance() {
        if (HostConfigManager.sharedInstance === undefined) {
            HostConfigManager.sharedInstance = new HostConfigManager();
        }
        return HostConfigManager.sharedInstance;
    }

    public getDefaultStyle() {
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

    public getColor(color: string): string {
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

    public getSubtleColor(color: string): string {
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

    public getFontSize(size: string): number {
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

    public getFontWeight(weight: string): 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' {
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

    public getImgSize(size: string): number | string {
        switch (size) {
            case ImageSize.Auto:
                return 0;
            case ImageSize.Large:
                return 160;
            case ImageSize.Medium:
                return 80;
            case ImageSize.Small:
                return 40;
            case ImageSize.Stretch:
                return 0;
            default:
                return this.getImgSize(ImageSize.Auto);
        }
    }

    public getSpacing(spacing: string): number {
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

    public getTextAlignment(align: string): 'center' | 'left' | 'right' {
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

    public getSelfAlignment(align: string): FlexAlignType {
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

    public getColumnWidth(width: string | number): string | number {
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

    public getWrap(wrap: boolean): 'wrap' | 'nowrap' {
        return wrap ? 'wrap' : 'nowrap';
    }
}
