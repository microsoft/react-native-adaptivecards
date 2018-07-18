export interface FormField {
    value: string;
    validate: boolean;
}

export class FormContext {
    private formFields: { [id: string]: FormField } = {};

    private static sharedInstance: FormContext;

    private constructor() { }

    public static getInstance() {
        if (FormContext.sharedInstance === undefined) {
            FormContext.sharedInstance = new FormContext();
        }
        return FormContext.sharedInstance;
    }

    public updateField(id: string, value: string, validate: boolean) {
        if (id && value) {
            this.formFields[id] = {
                value: value,
                validate: validate
            };
        }
    }

    public getField(id: string): FormField {
        if (id) {
            return this.formFields[id];
        }
        return undefined;
    }

    public getFieldValue(id: string) {
        let field = this.getField(id);
        if (field) {
            return field.value;
        }
        return undefined;
    }

    public getFields(ids: string[]): FormField[] {
        let result: FormField[] = [];
        if (ids) {
            ids.forEach((id) => {
                result.push(this.getField(id));
            });
        }
        return result;
    }

    public getFormData(ids: string[]): { [id: string]: string } {
        if (ids) {
            return ids.reduce((prev, id) => {
                let field = this.formFields[id];
                let result: { [id: string]: string } = {};
                if (field && field.value) {
                    result[id] = field.value;
                } else {
                    result[id] = '';
                }
                return { ...prev, ...result };
            }, {});
        }
        return {};
    }

    public validateField(id: string): boolean {
        let field = this.getField(id);
        if (field) {
            return field.validate;
        }
        return true;
    }

    public validateFields(ids: string[]): boolean {
        if (ids) {
            return ids.reduce((prev, current) => {
                return prev && this.validateField(current);
            }, true);
        }
        return true;
    }
}
