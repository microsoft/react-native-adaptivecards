export class BackgroundImageProp {
    constructor(payload) {
        this.url = payload.url;
        this.mode = payload.mode;
        this.horizontalAlignment = payload.horizontalAlignment;
        this.verticalAlignment = payload.verticalAlignment;
    }
}
