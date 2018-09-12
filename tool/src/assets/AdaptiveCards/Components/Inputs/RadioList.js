import * as React from 'react';
import { FlatList } from 'react-native';
import { RadioBox } from './RadioBox';
export class RadioList extends React.Component {
    constructor() {
        super(...arguments);
        this.renderCheckItem = (info) => {
            return (React.createElement(RadioBox, { title: info.item.title, value: info.item.value, checked: this.isValueSelected(info.item.value), theme: this.props.theme, onClick: this.onChoose }));
        };
        this.extractKey = (item, index) => {
            return `value: ${item.value}, index: ${index}, checked:${this.props.selected === item.value}`;
        };
        this.isValueSelected = (value) => {
            return this.props.selected && this.props.selected === value;
        };
        this.onChoose = (value) => {
            if (this.props.onChoose) {
                this.props.onChoose(value);
            }
        };
    }
    render() {
        if (this.props.choices) {
            return (React.createElement(FlatList, { extraData: this.props.selected, data: this.props.choices, renderItem: this.renderCheckItem, keyExtractor: this.extractKey }));
        }
        else {
            return null;
        }
    }
}
