import { IAction } from './IAction';
import { IContent } from './IContent';

export interface IScope extends IContent {
    readonly selectAction?: IAction;
    readonly backgroundImage?: string | { url: string };
    readonly action: IAction;
    readonly inputFields: string[];
    getBackgroundImageUrl: () => string;
    validateScope: () => boolean;
}
