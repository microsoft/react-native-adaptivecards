import * as React from 'react';
import { View } from 'react-native';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { FactView } from './Fact';

interface IProps {
    index: number;
    element: FactSetElement;
    theme: 'default' | 'emphasis';
}

export class FactSetView extends React.Component<IProps> {
    public render() {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
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
        const { element, theme } = this.props;

        if (!element || !element.isValid || !element.facts || element.facts.length === 0) {
            return undefined;
        }

        return element.facts.map((fact, index) => (
            <FactView
                key={index}
                element={fact}
                theme={theme}
            />
        ));
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
