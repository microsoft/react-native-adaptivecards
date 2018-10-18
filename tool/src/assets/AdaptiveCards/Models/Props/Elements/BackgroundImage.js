export class BackgroundImage {
    constructor(json) {
        this.url = json.url;
        this.mode = json.mode;
        this.horizontalAlignment = json.horizontalAlignment;
        this.verticalAlignment = json.verticalAlignment;
    }
}
