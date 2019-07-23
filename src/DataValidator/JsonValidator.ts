import { CardContext } from '../Contexts/CardContext';
import { CardModel } from '../Models/Cards/Card';

export class JsonValidator {

    public static isSchemaValid(Json: any) {
        let context = CardContext.createInstance();
        let card = new CardModel(Json, undefined, context);
        return card.isSchemaCheckPassed;
    }

    public static getSchemaCheckResult(Json: any) {
        let context = CardContext.createInstance();
        let card = new CardModel(Json, undefined, context);
        return card.getSchemaCheckResult;
    }

    public static getDescendsAndSelf(Json: any) {
        let context = CardContext.createInstance();
        let card = new CardModel(Json, undefined, context);
        return card.descendsAndSelf;
    }

    public static getSchemaCheckMessage(Json: any) {
        let checkResult = this.getSchemaCheckResult(Json);
        let output_message: string[] = [];

        if (checkResult && checkResult.messages) {
            checkResult.messages.forEach((message) => {
                switch (message.level) {
                    case 'Info':
                        output_message = output_message.concat(`Info >> ${message.message}  `);
                        break;
                    case 'Warning':
                        output_message = output_message.concat(`Warning >> ${message.message}  `);
                        break;
                    case 'Error':
                        output_message = output_message.concat(`Error >> ${message.message}  `);
                        break;
                    default:
                        output_message = output_message.concat(`Unknown message >> ${message.message}  `);
                        break;
                }
            });
        }
        if (output_message.length < 1) {
            output_message = output_message.concat(`Valid Data`);
        }
        return [checkResult.isValid, output_message];
    }
}
