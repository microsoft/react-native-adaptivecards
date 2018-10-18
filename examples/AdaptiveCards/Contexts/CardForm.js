export class CardForm {
    constructor() {
        this.fields = {};
    }
    write(field) {
        if (field && field.id) {
            this.fields[field.id] = field;
        }
    }
    read(index) {
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
        }
        else {
            return index.reduce((prev, id) => {
                if (id && this.fields[id]) {
                    prev.push(this.fields[id]);
                }
                return prev;
            }, []);
        }
    }
    isValid(id) {
        if (id === undefined) {
            return Object.keys(this.fields).reduce((prev, id) => {
                if (id && this.fields[id]) {
                    prev = prev && this.fields[id].isValid;
                }
                return prev;
            }, true);
        }
        else {
            let field = this.read(id);
            if (field) {
                return field.isValid;
            }
            return true;
        }
    }
}
