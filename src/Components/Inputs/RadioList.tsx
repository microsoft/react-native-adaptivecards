import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { HostConfig } from '../../Configs/Types';
import { Guid } from '../../Shared/Guid';
import { IChoice } from '../../Shared/Types';
import { RadioBox } from './RadioBox';

interface IProps<T> {
    choices: IChoice<T>[];
    theme: 'default' | 'emphasis';
    config: HostConfig;
    onChoose: (index: number) => void;
}

export class RadioList<T> extends React.Component<IProps<T>> {
    public render() {
        if (this.props.choices) {
            return (
                <FlatList
                    data={this.props.choices}
                    renderItem={this.renderRadioBox}
                    keyExtractor={this.extractKey}
                    extraData={Guid.newGuid()}
                />
            );
        } else {
            return null;
        }
    }

    private renderRadioBox = (info: ListRenderItemInfo<IChoice<T>>) => {
        return (
            <RadioBox
                index={info.index}
                title={info.item.title}
                value={info.item.value}
                config={this.props.config}
                selected={info.item.selected}
                theme={this.props.theme}
                onCheck={this.onChoose}
            />
        );
    }

    private extractKey = (item: IChoice<T>, index: number) => {
        return `value: ${item.value}, index: ${index}, checked:${item.selected}`;
    }

    private onChoose = (index: number) => {
        if (this.props.onChoose) {
            this.props.onChoose(index);
        }
    }
}
