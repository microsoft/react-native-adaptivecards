import { AbstractModel } from './AbstractModel';

export abstract class ActionModel extends AbstractModel {
    public abstract onAction(onSuccess: (data: any) => void, onError: (error: any) => void) : void;
}
