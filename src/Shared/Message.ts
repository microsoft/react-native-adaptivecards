import { IMessage } from './Types';

export class Message implements IMessage {
    public readonly level: 'info' | 'success' | 'warning' | 'error';
    public readonly message: string;

    public constructor(message: string, level: 'info' | 'success' | 'warning' | 'error') {
        this.message = message;
        this.level = level;
    }
}
