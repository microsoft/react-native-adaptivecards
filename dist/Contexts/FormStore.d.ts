export interface FormField {
    id: string;
    value: string;
    isValid: boolean;
}
export declare class FormStore {
    fields: {
        [id: string]: FormField;
    };
    listeners: {
        [id: string]: Array<(field: FormField) => void>;
    };
    private constructor();
    static createInstance(): FormStore;
    write(field: FormField): void;
    read(id: string): FormField;
    read(id: string[]): FormField[];
    read(): FormField[];
    isValid(): boolean;
    isValid(id: string): boolean;
    registerListener(id: string, listener: (field: FormField) => void): void;
}
