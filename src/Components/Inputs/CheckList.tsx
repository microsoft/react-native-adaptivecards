import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { HostConfig } from '../../Configs/Types';
import { Guid } from '../../Shared/Guid';
import { IChoice } from '../../Shared/Types';
import { Checkbox } from './CheckBox';

interface IProps<T> {
    choices: IChoice<T>[];
    onCheck: (index: number) => void;
    theme: 'default' | 'emphasis';
    config: HostConfig;
}

export class CheckList<T> extends React.Component<IProps<T>> {
    public render() {
        if (this.props.choices) {
            return (
                <FlatList
                    data={this.props.choices}
                    renderItem={this.renderCheckItem}
                    keyExtractor={this.extractKey}
                    extraData={Guid.newGuid()}
                />
            );
        } else {
            return null;
        }
    }

    private renderCheckItem = (info: ListRenderItemInfo<IChoice<T>>) => {
        return (
            <Checkbox
                index={info.index}
                title={info.item.title}
                value={info.item.value}
                selected={info.item.selected}
                theme={this.props.theme}
                config={this.props.config}
                onCheck={this.onCheck}
            />
        );
    }

    private onCheck = (index: number) => {
        if (this.props.onCheck) {
            this.props.onCheck(index);
        }
    }

    private extractKey = (item: IChoice<T>, index: number) => {
        return `value: ${item.value}, index: ${index} checked:${item.selected}`;
    }
}
