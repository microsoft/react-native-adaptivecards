import { CardContext } from '../Contexts/CardContext';
import { CardModel } from '../Models/Cards/Card';

export class JsonValidator {

    public static isSchemaValid(json: any) {
        const context = CardContext.createInstance();
        const card = new CardModel(json, undefined, context);
        return card.isSchemaCheckPassed;
    }

    public static getSchemaCheckResult(Json: any) {
        const context = CardContext.createInstance();
        const card = new CardModel(Json, undefined, context);
        return card.schemaCheckResult;
    }

    public static getDescendsAndSelf(Json: any) {
        const context = CardContext.createInstance();
        const card = new CardModel(Json, undefined, context);
        return card.descendsAndSelf;
    }

    public static getSchemaCheckMessage(Json: any) {
        let checkResult = this.getSchemaCheckResult(Json);
        let outputMessage: string[] = [];

        if (checkResult && checkResult.messages) {
            checkResult.messages.forEach((message) => {
                switch (message.level) {
                    case 'Info':
                        outputMessage = outputMessage.concat(`Info >> ${message.message}  `);
                        break;
                    case 'Warning':
                        outputMessage = outputMessage.concat(`Warning >> ${message.message}  `);
                        break;
                    case 'Error':
                        outputMessage = outputMessage.concat(`Error >> ${message.message}  `);
                        break;
                    default:
                        outputMessage = outputMessage.concat(`Unknown message >> ${message.message}  `);
                        break;
                }
            });
        }
        if (outputMessage.length < 1) {
            outputMessage = outputMessage.concat(`Valid Data`);
        }
        return [checkResult.isValid, outputMessage];
    }
}
