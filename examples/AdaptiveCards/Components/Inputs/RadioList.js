import * as React from 'react';
import { FlatList } from 'react-native';
import { Guid } from '../../Shared/Guid';
import { RadioBox } from './RadioBox';
export class RadioList extends React.Component {
    constructor() {
        super(...arguments);
        this.renderRadioBox = (info) => {
            return (React.createElement(RadioBox, { index: info.index, title: info.item.title, value: info.item.value, config: this.props.config, selected: info.item.selected, theme: this.props.theme, onCheck: this.onChoose }));
        };
        this.extractKey = (item, index) => {
            return `value: ${item.value}, index: ${index}, checked:${item.selected}`;
        };
        this.onChoose = (index) => {
            if (this.props.onChoose) {
                this.props.onChoose(index);
            }
        };
    }
    render() {
        if (this.props.choices) {
            return (React.createElement(FlatList, { data: this.props.choices, renderItem: this.renderRadioBox, keyExtractor: this.extractKey, extraData: Guid.newGuid() }));
        }
        else {
            return null;
        }
    }
}
