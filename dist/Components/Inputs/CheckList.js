import * as React from 'react';
import { FlatList } from 'react-native';
import { Checkbox } from './CheckBox';
export class CheckList extends React.Component {
    constructor() {
        super(...arguments);
        this.renderCheckItem = (info) => {
            return (React.createElement(Checkbox, { title: info.item.title, value: info.item.value, checked: info.item.checked, theme: this.props.theme, onCheck: this.onChoose }));
        };
        this.extractKey = (item, index) => {
            return `value: ${item.value}, index: ${index} checked:${item.checked}`;
        };
        this.onChoose = (value) => {
            if (this.props.onCheck) {
                this.props.onCheck(value);
            }
        };
    }
    render() {
        if (this.props.choices) {
            return (React.createElement(FlatList, { data: this.props.choices, renderItem: this.renderCheckItem, keyExtractor: this.extractKey }));
        }
        else {
            return null;
        }
    }
}
