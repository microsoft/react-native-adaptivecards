import * as React from 'react';
import { FlatList } from 'react-native';
import { Guid } from '../../Shared/Guid';
import { Checkbox } from './CheckBox';
export class CheckList extends React.Component {
    constructor() {
        super(...arguments);
        this.renderCheckItem = (info) => {
            return (React.createElement(Checkbox, { index: info.index, title: info.item.title, value: info.item.value, selected: info.item.selected, theme: this.props.theme, config: this.props.config, onCheck: this.onCheck }));
        };
        this.onCheck = (index) => {
            if (this.props.onCheck) {
                this.props.onCheck(index);
            }
        };
        this.extractKey = (item, index) => {
            return `value: ${item.value}, index: ${index} checked:${item.selected}`;
        };
    }
    render() {
        if (this.props.choices) {
            return (React.createElement(FlatList, { data: this.props.choices, renderItem: this.renderCheckItem, keyExtractor: this.extractKey, extraData: Guid.newGuid() }));
        }
        else {
            return null;
        }
    }
}
