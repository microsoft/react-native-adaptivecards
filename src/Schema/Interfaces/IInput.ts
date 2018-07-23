import { IContent } from './IContent';

export interface IInput extends IContent {
    readonly id: string;
    readonly value?: string;
    validate(input: string): boolean;
}
