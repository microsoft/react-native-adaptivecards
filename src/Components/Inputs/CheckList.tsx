import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Checkbox } from './Checkbox';

interface IProps<T extends { title: string, value: V }, V> {
    choices: T[];
    selected: V[];
    onChoose: (value: V) => void;
    theme: 'default' | 'emphasis';
}

export class CheckList<T extends { title: string, value: V }, V> extends React.Component<IProps<T, V>> {
    public render() {
        if (this.props.choices) {
            return (
                <FlatList
                    extraData={this.props.selected}
                    data={this.props.choices}
                    renderItem={this.renderCheckItem}
                    keyExtractor={this.extractKey}
                />
            );
        } else {
            return null;
        }
    }

    private renderCheckItem = (info: ListRenderItemInfo<T>) => {
        return (
            <Checkbox
                title={info.item.title}
                value={info.item.value}
                checked={this.isValueSelected(info.item.value)}
                theme={this.props.theme}
                onClick={this.onChoose}
            />
        );
    }

    private extractKey = (item: T, index: number) => {
        return `value: ${item.value}, index: ${index} checked:${this.props.selected.indexOf(item.value) > 0}`;
    }

    private isValueSelected = (value: V) => {
        return this.props.selected && this.props.selected.indexOf(value) >= 0;
    }

    private onChoose = (value: V) => {
        if (this.props.onChoose) {
            this.props.onChoose(value);
        }
    }
}
