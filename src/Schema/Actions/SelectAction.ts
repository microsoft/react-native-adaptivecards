import { ElementUtils } from '../../Utils/ElementUtils';
import { ActionElement } from '../Abstract/ActionElement';
import { IElement } from '../Interfaces/IElement';
import { IInput } from '../Interfaces/IInput';
import { IScope } from '../Interfaces/IScope';

export class SelectActionElement extends ActionElement {
    // Required
    public readonly title: string;
    public readonly subTitle: string;
    public readonly data: any;
    public readonly children: IElement[] = [];

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.title = json.selectedTextTitle;
            this.subTitle = json.selectedTextSubTitle;
            this.data = json.data;
        }
    }

    public get targetFormField() {
        let targetInput = this.ancestorsAndSelf.find(element => ElementUtils.isSelectActionTarget(element.type)) as IInput;
        if (targetInput) {
            return targetInput.id;
        }
        return undefined;
    }

    public get scope(): IScope {
        return this.ancestorsAndSelf.find(element => element.parent === undefined) as IScope;
    }

    public get requiredProperties() {
        return ['type', 'selectedTextTitle', 'selectedTextSubTitle', 'data'];
    }
}
