export class BackgroundImage {
    public readonly url: string;
    public readonly mode: 'stretch' | 'repeatHorizontally' | 'repeatVertically' | 'repeat';
    public readonly horizontalAlignment: 'left' | 'center' | 'right';
    public readonly verticalAlignment: 'top' | 'center' | 'bottom';

    constructor(json: any) {
        this.url = json.url;
        this.mode = json.mode;
        this.horizontalAlignment = json.horizontalAlignment;
        this.verticalAlignment = json.verticalAlignment;
    }
}
