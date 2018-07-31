export enum HostRenderer {
    SVG = 'SVG',
}

export interface ISVGRenderer {
    (svgXmlData: string, width: number, height: number): JSX.Element;
}

export type IHostRenderer = ISVGRenderer;
