import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { AccessibilityUtils } from '../../Utils/AccessibilityUtils';
import { SeparateLine } from '../Basic/SeparateLine';
import { Card } from '../Containers/Card';
import { ModalBox } from '../Containers/ModalBox';
import { Choice } from './Choice';

interface IProps<T extends { title: string, value: V }, V> {
    choices: T[];
    selected: V[];
    show: boolean;
    onChoose: (value: V) => void;
    onClose: () => void;
}

export class ChoicePanel<T extends { title: string, value: V }, V> extends React.Component<IProps<T, V>> {
    private panel: Card;
    public render() {
        if (this.props.choices) {
            return (
                <ModalBox
                    show={this.props.show}
                    onShow={this.onShow}
                    onRequestClose={this.onClose}
                    onBackgroundPress={this.onClose}
                >
                    <Card
                        flex={0}
                        fit='content'
                        ref={ref => this.panel = ref}
                    >
                        <FlatList
                            data={this.props.choices}
                            renderItem={this.renderChoice}
                            keyExtractor={this.extractKey}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                    </Card>
                </ModalBox>
            );
        } else {
            return null;
        }
    }

    private renderChoice = (info: ListRenderItemInfo<T>) => {
        if (!info.item) {
            return undefined;
        }

        return (
            <Choice
                title={info.item.title}
                value={info.item.value}
                onChoose={this.onChoose}
                selected={this.isValueSelected(info.item.value)}
            />
        );
    }

    private renderSeparator = () => {
        return (
            <SeparateLine noMargin={true}/>
        );
    }

    private extractKey = (item: T, index: number) => {
        return `value: ${item.value}, index: ${index}`;
    }

    private isValueSelected = (value: V) => {
        return this.props.selected && this.props.selected.indexOf(value) >= 0;
    }

    private onChoose = (value: V) => {
        if (this.props.onChoose) {
            this.props.onChoose(value);
        }
    }

    private onClose = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    private onShow = () => {
        if (this.panel) {
            AccessibilityUtils.focusComponent(this.panel);
        }
    }
}
