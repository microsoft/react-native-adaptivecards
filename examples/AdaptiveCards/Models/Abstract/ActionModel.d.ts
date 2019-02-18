import { AbstractModel } from './AbstractModel';
export declare abstract class ActionModel extends AbstractModel {
    abstract onAction(onSuccess: (data: any) => void, onError: (error: any) => void): void;
}
