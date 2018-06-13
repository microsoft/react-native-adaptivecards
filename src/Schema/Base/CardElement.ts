import { Utils } from '../../Shared/Utils';
import { ActionElement } from './ActionElement';

export abstract class CardElement {
    // Required
    readonly type: string;

    isValidJSON: boolean = true;

    constructor(json: any) {
        this.type = this.getTypeName();
        if (!this.type) {
            this.noTypeName();
        }
        this.validateJSON(json, this.getRequiredProperties());
    }

    abstract getTypeName(): string;

    abstract getRequiredProperties(): Array<string>;

    public supportAction() {
        return false;
    }

    public getAction(): ActionElement {
        return undefined;
    }

    public getActions(): ActionElement[] {
        return [];
    }

    public isInput() {
        return false;
    }

    public isForm() {
        return false;
    }

    public validateForm(value?: any) {
        return true;
    }

    public getId(): string {
        return undefined;
    }

    public getAllInputFieldIds(): string[] {
        return [];
    }

    private noTypeName(): void {
        this.isValidJSON = false;
        console.error('Please return a valid type name in \'getTypeName()\' method.');
    }

    private noDataFound(): void {
        this.isValidJSON = false;
        console.error(this.getTypeName() + ': data not found');
    }

    private invalidRequiredProperty(property: string): void {
        this.isValidJSON = false;
        console.error(this.getTypeName() + ': ' + property + ' is required');
    }

    private validateJSON(json: any, requiredProperties: Array<string>): void {
        if (!json) {
            this.noDataFound();
        }

        if (requiredProperties) {
            for (let i = 0; i < requiredProperties.length; i++) {
                let property = requiredProperties[i];
                if (!Utils.isValidValue(json[property])) {
                    this.invalidRequiredProperty(property);
                    return;
                }
            }
        }
    }

    public isValid(): boolean {
        return this.isValidJSON;
    }
}
