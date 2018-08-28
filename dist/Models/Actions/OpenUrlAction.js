import { Linking } from 'react-native';
import { ActionModel } from '../Abstract/ActionModel';
export class OpenUrlActionModel extends ActionModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.onAction = (onSuccess, onError) => {
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
        };
        this.url = json.url;
        this.title = json.title;
    }
}
