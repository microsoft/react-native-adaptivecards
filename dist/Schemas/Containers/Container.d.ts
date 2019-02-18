import { ContainerModel } from '../../Models/Containers/Container';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class ContainerSchema extends SchemaElement<ContainerModel> {
    rules: SchemaRule<ContainerModel>[];
    protected propsSchemas: {
        'items': {
            name: string;
            isRequired: boolean;
        };
        'selectAction': {
            name: string;
            isRequired: boolean;
        };
        'style': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'height': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'verticalContentAlignment': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'id': {
            name: string;
            isRequired: boolean;
        };
        'backgroundImage': {
            name: string;
            isRequired: boolean;
        };
        'spacing': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'separator': {
            name: string;
            isRequired: boolean;
            accepts: boolean[];
        };
    };
}
