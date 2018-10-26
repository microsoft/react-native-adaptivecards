import * as React from 'react';
import { FlatList } from 'react-native';
import { SeparateLine } from '../Basic/SeparateLine';
import { Card } from '../Containers/Card';
import { ModalBox } from '../Containers/ModalBox';
import { Choice } from './Choice';
export class ChoicePanel extends React.Component {
    constructor() {
        super(...arguments);
        this.renderChoice = (info) => {
            if (!info.item) {
                return undefined;
            }
            return (React.createElement(Choice, { title: info.item.title, value: info.item.value, onChoose: this.onChoose, selected: this.isValueSelected(info.item.value) }));
        };
        this.renderSeparator = () => {
            return (React.createElement(SeparateLine, { noMargin: true }));
        };
        this.extractKey = (item, index) => {
            return `value: ${item.value}, index: ${index}`;
        };
        this.isValueSelected = (value) => {
            return this.props.selected && this.props.selected.indexOf(value) >= 0;
        };
        this.onChoose = (value) => {
            if (this.props.onChoose) {
                this.props.onChoose(value);
            }
        };
        this.onClose = () => {
            if (this.props.onClose) {
                this.props.onClose();
            }
        };
    }
    render() {
        if (this.props.choices) {
            return (React.createElement(ModalBox, { show: this.props.show, onBackgroundPress: this.onClose },
                React.createElement(Card, { flex: 0, fit: 'content' },
                    React.createElement(FlatList, { data: this.props.choices, renderItem: this.renderChoice, keyExtractor: this.extractKey, ItemSeparatorComponent: this.renderSeparator }))));
        }
        else {
            return null;
        }
    }
}
