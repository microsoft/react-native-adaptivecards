import { CardContext } from '../Contexts/CardContext';
import { CardModel } from '../Models/Cards/Card';
export class JsonValidator {
    static isSchemaValid(json) {
        const context = CardContext.createInstance();
        const card = new CardModel(json, undefined, context);
        return card.isSchemaCheckPassed;
    }
    static getSchemaCheckResult(Json) {
        const context = CardContext.createInstance();
        const card = new CardModel(Json, undefined, context);
        return card.schemaCheckResult;
    }
    static getDescendsAndSelf(Json) {
        const context = CardContext.createInstance();
        const card = new CardModel(Json, undefined, context);
        return card.descendsAndSelf;
    }
    static getSchemaCheckMessage(Json) {
        let checkResult = this.getSchemaCheckResult(Json);
        let outputMessage = [];
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
