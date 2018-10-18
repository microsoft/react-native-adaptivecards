import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { SeparateLine } from '../Basic/SeparateLine';
import { Card } from '../Containers/Card';
import { ModalBox } from '../Containers/ModalBox';
import { Choice, IChoice } from './Choice';

interface IProps<T> {
    choices: IChoice<T>[];
    show: boolean;
    onChoose: (value: T) => void;
    onClose: () => void;
}

export class ChoicePanel<T> extends React.Component<IProps<T>> {
    public render() {
        if (this.props.choices) {
            return (
                <ModalBox
                    show={this.props.show}
                    onBackgroundPress={this.onClose}
                >
                    <Card
                        flex={0}
                        fit='content'
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

    private renderChoice = (info: ListRenderItemInfo<IChoice<T>>) => {
        if (!info.item) {
            return undefined;
        }

        return (
            <Choice
                title={info.item.title}
                value={info.item.value}
                selected={info.item.selected}
                onChoose={this.onChoose}
            />
        );
    }

    private renderSeparator = () => {
        return (
            <SeparateLine noMargin={true}/>
        );
    }

    private extractKey = (item: IChoice<T>, index: number) => {
        return `value: ${item.value}, index: ${index}, selected: ${item.selected}`;
    }

    private onChoose = (value: T) => {
        if (this.props.onChoose) {
            this.props.onChoose(value);
        }
    }

    private onClose = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }
}
