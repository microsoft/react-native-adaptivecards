export class FormStore {
    constructor() {
        this.fields = {};
        this.listeners = {};
    }
    static createInstance() {
        return new FormStore();
    }
    write(field) {
        if (field && field.id) {
            this.fields[field.id] = field;
            if (this.listeners[field.id]) {
                this.listeners[field.id].forEach((listener) => listener(field));
            }
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
    registerListener(id, listener) {
        if (!this.listeners[id]) {
            this.listeners[id] = [listener];
        }
        else {
            this.listeners[id].push(listener);
        }
    }
}
