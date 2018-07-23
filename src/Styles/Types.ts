export interface ActionStyle {
    marginTop: number;
    marginLeft: number;
    iconPosition: 'LeftOfTitle' | 'AboveTitle';
    iconSize: number;
}

export interface ActionContainerStyle {
    direction: 'row' | 'column';
    align: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

export interface ImageStyle {
    align: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    size: number | 'auto' | 'stretch';
    spacing: number;
}

export interface TextBlockStyle {
    color: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textAlign: 'auto' | 'left' | 'right' | 'center' | 'justify';
    wrap: 'wrap' | 'nowrap';
    spacing: number;
}

export interface ImageSetStyle {
    imageSize: number | 'auto' | 'stretch';
    spacing: number;
}

export interface ShowCardStyle {
    mode: 'Inline' | 'Popup' | 'InlineEdgeToEdge';
    margin: number;
    theme: 'default' | 'emphasis';
}
