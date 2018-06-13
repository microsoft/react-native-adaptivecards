export class InputContext {
    private static sharedInstance: InputContext;
    private formFields: { [id: string]: string } = {};

    private constructor() { }

    public static getInstance() {
        if (InputContext.sharedInstance === undefined) {
            InputContext.sharedInstance = new InputContext();
        }
        return InputContext.sharedInstance;
    }

    public updateField(id: string, value: string) {
        if (id) {
            this.formFields[id] = value;
        }
    }

    public getField(id: string) {
        if (id) {
            return this.formFields[id];
        }
        return undefined;
    }

    public getFields(ids: string[]): { [id: string]: string } {
        if (ids) {
            return ids.reduce((prev, id) => {
                let value = this.formFields[id];
                let result: { [id: string]: string } = {};
                if (value) {
                    result[id] = value;
                } else {
                    result[id] = '';
                }
                return { ...prev, ...result };
            }, {});
        }
        return {};
    }
}
