export declare class Rules {
    text: string;
    styles: any;
    constructor(text: string, styles?: any);
    parse(): any;
    private preprocessor;
    private execData;
    private parseSimpleText;
    private parseText;
}
