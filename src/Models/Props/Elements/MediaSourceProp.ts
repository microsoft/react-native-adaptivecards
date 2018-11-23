export class MediaSourceProp {
    public readonly url: string;
    public readonly mimeType: string;

    constructor(payload: any) {
        this.url = payload.url;
        this.mimeType = payload.mimeType;
    }
}
