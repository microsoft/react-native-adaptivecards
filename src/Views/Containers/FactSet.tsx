import * as React from 'react';
import { View } from 'react-native';

import { FactSetNode } from '../../Models/Nodes/Containers/FactSet';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { FactView } from './Fact';

interface IProps extends IViewProps<FactSetNode> {
}

export class FactSetView extends React.Component<IProps> {
    public render() {
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
        const { model, context, theme } = this.props;

        if (!model || !model.facts || model.facts.length === 0) {
            return undefined;
        }

        return model.facts.map((fact, index) => (
            <FactView
                index={0}
                key={index}
                model={fact}
                context={context}
                theme={theme}
                
            />
        ));
    }

    private get spacing() {
        if (this.props.model.separator) {
            return 0;
        }

        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
}
