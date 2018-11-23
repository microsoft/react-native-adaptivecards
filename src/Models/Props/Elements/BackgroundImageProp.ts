export class BackgroundImageProp {
    public readonly url: string;
    public readonly mode: 'stretch' | 'repeatHorizontally' | 'repeatVertically' | 'repeat';
    public readonly horizontalAlignment: 'left' | 'center' | 'right';
    public readonly verticalAlignment: 'top' | 'center' | 'bottom';

    constructor(payload: any) {
        this.url = payload.url;
        this.mode = payload.mode;
        this.horizontalAlignment = payload.horizontalAlignment;
        this.verticalAlignment = payload.verticalAlignment;
    }
}
