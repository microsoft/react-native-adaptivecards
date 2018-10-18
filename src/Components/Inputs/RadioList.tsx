import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { IRadio, RadioBox } from './RadioBox';

interface IProps<T> {
    choices: IRadio<T>[];
    onChoose: (value: T) => void;
    theme: 'default' | 'emphasis';
}

export class RadioList<T> extends React.Component<IProps<T>> {
    public render() {
        if (this.props.choices) {
            return (
                <FlatList
                    data={this.props.choices}
                    renderItem={this.renderRadioBox}
                    keyExtractor={this.extractKey}
                />
            );
        } else {
            return null;
        }
    }

    private renderRadioBox = (info: ListRenderItemInfo<IRadio<T>>) => {
        return (
            <RadioBox
                title={info.item.title}
                value={info.item.value}
                activated={info.item.activated}
                theme={this.props.theme}
                onActive={this.onChoose}
            />
        );
    }

    private extractKey = (item: IRadio<T>, index: number) => {
        return `value: ${item.value}, index: ${index}, checked:${item.activated}`;
    }

    private onChoose = (value: T) => {
        console.log(value);
        if (this.props.onChoose) {
            this.props.onChoose(value);
        }
    }
}
