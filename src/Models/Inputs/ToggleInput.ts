import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';

export class ToggleInputModel extends InputModel {
    public title: string;
    public valueOff: string;
    public valueOn: string;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.title = json.title;
        this.valueOff = json.valueOff;
        this.valueOn = json.valueOn;

        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
            this.onInput(this.value);
        }
    }

    public isValueValid = (value?: string) => true;
}
