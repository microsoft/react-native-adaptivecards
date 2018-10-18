import { InputNode } from '../Models/Nodes/Abstract/InputNode';

export class CardForm {
    public fields: { [id: string]: InputNode } = {};

    public write(field: InputNode) {
        if (field && field.id) {
            this.fields[field.id] = field;
        }
    }

    public read(id: string): InputNode;
    public read(id: string[]): InputNode[];
    public read(): InputNode[];
    public read(index?: string | string[]): InputNode | InputNode[] {
        if (index === undefined) {
            return Object.keys(this.fields).reduce((prev, id) => {
                if (id && this.fields[id]) {
                    prev.push(this.fields[id]);
                }
                return prev;
            }, []);
        }
        if (typeof index === 'string') {
            return this.fields[index];
        } else {
            return index.reduce((prev, id) => {
                if (id && this.fields[id]) {
                    prev.push(this.fields[id]);
                }
                return prev;
            }, []);
        }
    }

    public isValid(): boolean;
    public isValid(id: string): boolean;
    public isValid(id?: string): boolean {
        if (id === undefined) {
            return Object.keys(this.fields).reduce((prev, id) => {
                if (id && this.fields[id]) {
                    prev = prev && this.fields[id].isValid;
                }
                return prev;
            }, true);
        } else {
            let field = this.read(id);
            if (field) {
                return field.isValid;
            }
            return true;
        }
    }
}
