import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { HostConfig } from '../../Configs/Types';
import { Guid } from '../../Shared/Guid';
import { IChoice } from '../../Shared/Types';
import { SeparateLine } from '../Basic/SeparateLine';
import { Card } from '../Containers/Card';
import { ModalBox } from '../Containers/ModalBox';
import { Choice } from './Choice';

interface IProps<T> {
    choices: IChoice<T>[];
    config: HostConfig;
    show: boolean;
    onChoose: (index: number) => void;
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
                        config={this.props.config}
                    >
                        <FlatList
                            data={this.props.choices}
                            renderItem={this.renderChoice}
                            keyExtractor={this.extractKey}
                            ItemSeparatorComponent={this.renderSeparator}
                            extraData={Guid.newGuid()}
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
                index={info.index}
                title={info.item.title}
                value={info.item.value}
                config={this.props.config}
                selected={info.item.selected}
                onSelect={this.onChoose}
            />
        );
    }

    private renderSeparator = () => {
        return (
            <SeparateLine
                hasSpacing={false}
                config={this.props.config}
            />
        );
    }

    private extractKey = (item: IChoice<T>, index: number) => {
        return `value: ${item.value}, index: ${index}, selected: ${item.selected}`;
    }

    private onClose = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    private onChoose = (index: number) => {
        if (this.props.onChoose) {
            this.props.onChoose(index);
        }
    }
}
