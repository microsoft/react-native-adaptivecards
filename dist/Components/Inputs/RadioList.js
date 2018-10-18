import * as React from 'react';
import { FlatList } from 'react-native';
import { RadioBox } from './RadioBox';
export class RadioList extends React.Component {
    constructor() {
        super(...arguments);
        this.renderRadioBox = (info) => {
            return (React.createElement(RadioBox, { title: info.item.title, value: info.item.value, activated: info.item.activated, theme: this.props.theme, onActive: this.onChoose }));
        };
        this.extractKey = (item, index) => {
            return `value: ${item.value}, index: ${index}, checked:${item.activated}`;
        };
        this.onChoose = (value) => {
            console.log(value);
            if (this.props.onChoose) {
                this.props.onChoose(value);
            }
        };
    }
    render() {
        if (this.props.choices) {
            return (React.createElement(FlatList, { data: this.props.choices, renderItem: this.renderRadioBox, keyExtractor: this.extractKey }));
        }
        else {
            return null;
        }
    }
}
