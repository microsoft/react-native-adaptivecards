import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Checkbox, ICheckable } from './CheckBox';

interface IProps<T> {
    choices: ICheckable<T>[];
    onCheck: (value: T) => void;
    theme: 'default' | 'emphasis';
}

export class CheckList<T> extends React.Component<IProps<T>> {
    public render() {
        if (this.props.choices) {
            return (
                <FlatList
                    data={this.props.choices}
                    renderItem={this.renderCheckItem}
                    keyExtractor={this.extractKey}
                />
            );
        } else {
            return null;
        }
    }

    private renderCheckItem = (info: ListRenderItemInfo<ICheckable<T>>) => {
        return (
            <Checkbox
                title={info.item.title}
                value={info.item.value}
                checked={info.item.checked}
                theme={this.props.theme}
                onCheck={this.onChoose}
            />
        );
    }

    private extractKey = (item: ICheckable<T>, index: number) => {
        return `value: ${item.value}, index: ${index} checked:${item.checked}`;
    }

    private onChoose = (value: T) => {
        if (this.props.onCheck) {
            this.props.onCheck(value);
        }
    }
}
