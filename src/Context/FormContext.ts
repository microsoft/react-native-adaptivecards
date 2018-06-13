import { CardElement } from '../Schema/Base/CardElement';

export class FormContext {
    private static sharedInstance: FormContext;
    private formFields: { [id: string]: string } = {};

    private constructor() { }

    public static getInstance() {
        if (FormContext.sharedInstance === undefined) {
            FormContext.sharedInstance = new FormContext();
        }
        return FormContext.sharedInstance;
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

    public validateField(element: CardElement): boolean {
        console.log('Validate Field');
        if (element) {
            console.log('Pass Element check');
            if (element.isForm()) {
                console.log('Check Form');
                return element.validateForm();
            }
            if (element.isInput()) {
                console.log('Check Input Field');
                let id = element.getId();
                if (id) {
                    console.log('Pass id check');
                    return element.validateForm(this.getField(id));
                }
            }
            console.log('No need check');
            return true;
        }
        return false;
    }

    public validateFields(elements: CardElement[]): boolean {
        if (elements) {
            return elements.reduce((prev, current) => {
                return prev && this.validateField(current);
            }, true);
        }
        return false;
    }
}
