import { Guid } from '../../../Shared/Guid';
import { BlockType, ITreeNode, PlainContainerType } from '../../../Shared/Types';

export abstract class ViewNode implements ITreeNode {
    public readonly id: string;
    public abstract readonly type: BlockType | PlainContainerType;
    public parent: ViewNode;
    public readonly children: ViewNode[] = [];

    constructor(parent: ViewNode, json: any) {
        this.parent = parent;
        this.id = json.id;
        if (this.id === undefined) {
            this.id = Guid.newGuid();
        }
    }

    public equals(node: ViewNode): boolean {
        return node && this.id === node.id;
    }

    public replaceChild(oldChild: ViewNode, newChild: ViewNode): void {
        if (this.children && oldChild && newChild) {
            let index = this.children.findIndex(current => current.equals(oldChild));
            if (index >= 0) {
                newChild.parent = this;
                this.children[index].parent = undefined;
                this.children.splice(index, 1, newChild);
            }
        }
    }

    public removeChild(child: ViewNode): void {
        if (this.children && child) {
            let index = this.children.findIndex(current => current.equals(child));
            if (index >= 0) {
                this.children[index].parent = undefined;
                this.children.splice(index, 1);
            }
        }
    }

    public insertChild(child: ViewNode): void {
        if (this.children && child) {
            child.parent = this;
            this.children.push(child);
        }
    }

    public insertSibling(sibling: ViewNode, position: 'before' | 'after'): void {
        if (this.parent && this.parent.children && sibling) {
            let index = this.parent.children.findIndex(current => current.equals(this));
            if (index >= 0) {
                sibling.parent = this.parent;
                if (position === 'after') {
                    index = index + 1;
                }

                if (index === this.parent.children.length) {
                    this.parent.children.push(sibling);
                } else {
                    this.parent.children.splice(index, 0, sibling);
                }
            }
        }
    }

    public remove(): void {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = undefined;
        }
    }

    public replace(newNode: ViewNode): void {
        if (this.parent && newNode) {
            this.parent.replaceChild(this, newNode);
        }
    }

    public get ancestors(): ViewNode[] {
        if (this.parent) {
            return [this.parent, ...this.parent.ancestors];
        }
        return [];
    }

    public get ancestorsAndSelf(): ViewNode[] {
        return [this, ...this.ancestors];
    }

    public get descends(): ViewNode[] {
        return this.children.reduce(
            (prev, current) => {
                return prev.concat(current.descends);
            },
            this.children.slice()
        );
    }

    public get descendsAndSelf(): ViewNode[] {
        return [this, ...this.descends];
    }
}
