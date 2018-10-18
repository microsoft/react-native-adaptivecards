import * as React from 'react';
import { FlatList } from 'react-native';
import { Guid } from '../../Shared/Guid';
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
            return (React.createElement(Choice, { index: info.index, title: info.item.title, value: info.item.value, config: this.props.config, selected: info.item.selected, onSelect: this.onChoose }));
        };
        this.renderSeparator = () => {
            return (React.createElement(SeparateLine, { hasSpacing: false, config: this.props.config }));
        };
        this.extractKey = (item, index) => {
            return `value: ${item.value}, index: ${index}, selected: ${item.selected}`;
        };
        this.onClose = () => {
            if (this.props.onClose) {
                this.props.onClose();
            }
        };
        this.onChoose = (index) => {
            if (this.props.onChoose) {
                this.props.onChoose(index);
            }
        };
    }
    render() {
        if (this.props.choices) {
            return (React.createElement(ModalBox, { show: this.props.show, onBackgroundPress: this.onClose },
                React.createElement(Card, { flex: 0, fit: 'content', config: this.props.config },
                    React.createElement(FlatList, { data: this.props.choices, renderItem: this.renderChoice, keyExtractor: this.extractKey, ItemSeparatorComponent: this.renderSeparator, extraData: Guid.newGuid() }))));
        }
        else {
            return null;
        }
    }
}
