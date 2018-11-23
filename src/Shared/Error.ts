export class Error  {
    public readonly source: string;
    public readonly error: any;

    public constructor(source: string, error: any) {
        this.source = source;
        this.error = error;
    }
}
