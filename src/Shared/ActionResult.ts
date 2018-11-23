import { Error } from './Error';
import { Info } from './Info';
import { Message } from './Message';
import { IMessage, IResult } from './Types';

export class ActionResult implements IResult<Info | Error> {
    public readonly message: IMessage;    
    public readonly data: Info | Error;

    public constructor(message: IMessage, data: Info | Error) {
        this.message = message;
        this.data = data;
    }

    public static get succeed() {
        return new ActionResult(
            new Message('Action Succeed', 'success'),
            new Info('Adaptive Renderer', 'Action Succeed')
        );
    }
}

export class ActionError {
    public static get handlerNotFound() {
        return new ActionResult(
            new Message('Action Failed', 'error'),
            new Info('Adaptive Renderer', 'Action Handler Not Found')
        );
    }
}
