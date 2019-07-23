import { CardContext } from '../../Contexts/CardContext';
import { SchemaResult } from '../../Schemas/SchemaValidator';
import { TreeNode } from '../../Shared/Types';
export declare abstract class AbstractModel extends TreeNode<AbstractModel> {
    readonly type: string;
    readonly rawData: any;
    context: CardContext;
    protected schemaCheckResult: SchemaResult;
    path: string;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    protected outputSchemaMessage(): void;
    protected shallowCheckSchema(json: any): SchemaResult;
    protected deepCheckSchema(): SchemaResult;
    readonly isSchemaCheckPassed: boolean;
    readonly getSchemaCheckResult: SchemaResult;
    readonly children: AbstractModel[];
}
