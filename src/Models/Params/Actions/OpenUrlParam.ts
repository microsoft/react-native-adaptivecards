export class OpenUrlParam {
    public url: string;
    public data: any;
    public method: any;

    constructor(json: any) {
        this.url = json.url;
        // Customize for STCI
        this.method = json['-ms-method'];
        this.data = json['-ms-data'];
    }
}
