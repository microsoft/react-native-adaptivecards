import * as React from 'react';
import { View } from 'react-native';
import { FactSetModel } from '../../Models/Containers/FactSet';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { FactView } from './Fact';

interface IProps {
    index: number;
    model: FactSetModel;
    theme: 'default' | 'emphasis';
}

export class FactSetView extends React.Component<IProps> {
    public render() {

        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

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
            />
        ));
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
