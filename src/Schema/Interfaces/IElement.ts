import { ITreeNode } from '../../Shared/Types';

export interface IElement extends ITreeNode<IElement> {
    readonly type: string;
    readonly isValid: boolean;
    readonly requiredProperties: string[];
}
