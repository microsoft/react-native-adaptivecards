export class MediaSource {
    public readonly url: string;
    public readonly mimeType: string;

    constructor(json: any) {
        this.url = json.url;
        this.mimeType = json.mimeType;
    }
}
