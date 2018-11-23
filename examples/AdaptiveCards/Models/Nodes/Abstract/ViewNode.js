import { Guid } from '../../../Shared/Guid';
export class ViewNode {
    constructor(parent, payload) {
        this.children = [];
        this.parent = parent;
        this.id = payload.id;
        if (this.id === undefined) {
            this.id = Guid.newGuid();
        }
    }
    equals(node) {
        return node && this.id === node.id;
    }
    replaceChild(oldChild, newChild) {
        if (this.children && oldChild && newChild) {
            let index = this.children.findIndex(current => current.equals(oldChild));
            if (index >= 0) {
                newChild.parent = this;
                this.children[index].parent = undefined;
                this.children.splice(index, 1, newChild);
            }
        }
    }
    removeChild(child) {
        if (this.children && child) {
            let index = this.children.findIndex(current => current.equals(child));
            if (index >= 0) {
                this.children[index].parent = undefined;
                this.children.splice(index, 1);
            }
        }
    }
    insertChild(child) {
        if (this.children && child) {
            child.parent = this;
            this.children.push(child);
        }
    }
    insertSibling(sibling, position) {
        if (this.parent && this.parent.children && sibling) {
            let index = this.parent.children.findIndex(current => current.equals(this));
            if (index >= 0) {
                sibling.parent = this.parent;
                if (position === 'after') {
                    index = index + 1;
                }
                if (index === this.parent.children.length) {
                    this.parent.children.push(sibling);
                }
                else {
                    this.parent.children.splice(index, 0, sibling);
                }
            }
        }
    }
    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = undefined;
        }
    }
    replace(newNode) {
        if (this.parent && newNode) {
            this.parent.replaceChild(this, newNode);
        }
    }
    get ancestors() {
        if (this.parent) {
            return [this.parent, ...this.parent.ancestors];
        }
        return [];
    }
    get ancestorsAndSelf() {
        return [this, ...this.ancestors];
    }
    get descends() {
        return this.children.reduce((prev, current) => {
            return prev.concat(current.descends);
        }, this.children.slice());
    }
    get descendsAndSelf() {
        return [this, ...this.descends];
    }
}
