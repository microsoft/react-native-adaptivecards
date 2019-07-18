import { CardContext } from '../../Contexts/CardContext';
import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';

export class TextInputModel extends InputModel {
    public isMultiline: boolean;
    public maxLength: number;
    public style: 'text' | 'tel' | 'url' | 'email';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.isMultiline = json.isMultiline || false;
        this.maxLength = json.maxLength;
        this.style = StringUtils.normalize(json.style);

        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
            this.onInput(this.value);
        }
    }

    public isValueValid = (value?: string) => {
        let target = value !== undefined ? value : this.value;
        // TODO:: verify styles.
        if (this.maxLength) {
            if (target && target.length > this.maxLength) {
                return false;
            }
        }
        return true;
    }
}
