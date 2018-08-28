export interface FormField {
    id: string;
    value: string;
    isValid: boolean;
}

export class FormStore {
    public fields: { [id: string]: FormField } = {};
    public listeners: { [id: string]: Array<(field: FormField) => void> } = {};

    private constructor() { }

    public static createInstance() {
        return new FormStore();
    }

    public write(field: FormField) {
        if (field && field.id) {
            this.fields[field.id] = field;
            if (this.listeners[field.id]) {
                this.listeners[field.id].forEach((listener) => listener(field));
            }
        }
    }

    public read(id: string): FormField;
    public read(id: string[]): FormField[];
    public read(): FormField[];
    public read(index?: string | string[]): FormField | FormField[] {
        if (index === undefined) {
            return Object.keys(this.fields).reduce((prev, id) => {
                if (id && this.fields[id]) {
                    prev.push(this.fields[id]);
                }
                return prev;
            }, []);
        }
        if (typeof index === 'string') {
            return this.fields[index];
        } else {
            return index.reduce((prev, id) => {
                if (id && this.fields[id]) {
                    prev.push(this.fields[id]);
                }
                return prev;
            }, []);
        }
    }

    public isValid(): boolean;
    public isValid(id: string): boolean;
    public isValid(id?: string): boolean {
        if (id === undefined) {
            return Object.keys(this.fields).reduce((prev, id) => {
                if (id && this.fields[id]) {
                    prev = prev && this.fields[id].isValid;
                }
                return prev;
            }, true);
        } else {
            let field = this.read(id);
            if (field) {
                return field.isValid;
            }
            return true;
        }
    }

    public registerListener(id: string, listener: (field: FormField) => void) {
        if (!this.listeners[id]) {
            this.listeners[id] = [listener];
        } else {
            this.listeners[id].push(listener);
        }
    }
}
