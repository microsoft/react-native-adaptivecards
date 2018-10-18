export class OpenUrlParam {
    constructor(json) {
        this.url = json.url;
        this.method = json['-ms-method'];
        this.data = json['-ms-data'];
    }
}
