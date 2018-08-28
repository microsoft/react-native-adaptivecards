import { Linking } from 'react-native';
import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';

export class OpenUrlActionModel extends ActionModel {
    public title: string;
    public url: string;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.url = json.url;
        this.title = json.title;
    }

    public onAction = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
        if (this.context) {
            let handler = this.context.openUrlActionHandler;
            if (handler) {
                handler(this.url).then(onSuccess).catch(onError);
                return;
            }
        }
        Linking.canOpenURL(this.url).then((supported) => {
            if (supported) {
                Linking.openURL(this.url).then(onSuccess).catch(onError);
            }
        });
    }
}
