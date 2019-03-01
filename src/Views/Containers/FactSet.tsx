import * as React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { FactSetModel } from '../../Models/Containers/FactSet';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { FactView } from './Fact';

interface IProps {
    index: number;
    model: FactSetModel;
    theme: 'default' | 'emphasis';
}

interface IState {
    width: number | string;
}

export class FactSetView extends React.Component<IProps, IState> {
    private factCount: number;
    private widths: number[] = [];

    constructor(props: IProps) {
        super(props);

        this.state = {
            width: 'auto',
        };
    }

    public render() {

        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

        this.factCount = model.facts.length;

        return (
            <View
                style={{
                    flexDirection: 'column',
                    marginTop: this.spacing,
                    alignSelf: 'stretch'
                }}
            >
                {this.renderFacts()}
            </View>
        );
    }

    private renderFacts = () => {
        const { model, theme } = this.props;

        if (!model || !model.facts || model.facts.length === 0) {
            return undefined;
        }

        return model.facts.map((fact, index) => (
            <FactView
                key={index}
                model={fact}
                theme={theme}
                titleWidth={this.state.width}
                onLayoutTitle={this.onLayoutTitle}
            />
        ));
    }

    private get spacing() {
        if (this.props.model.separator) {
            return 0;
        }

        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
    
    private onLayoutTitle = (event: LayoutChangeEvent) => {
        let currWidth: number = event.nativeEvent.layout.width;
        this.widths.push(currWidth);
        
        if (this.widths.length > 0 && this.widths.length === this.factCount) {
            this.widths.sort();
            this.setState({
                width: this.widths[this.widths.length - 1]
            });
        }
    }
}
