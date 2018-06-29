import * as React from 'react';
import { Column } from '../../Components/Containers/Column';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';
import { FactView } from './Fact';

interface IProps extends IElementViewProps<FactSetElement> {
}

export class FactSetView extends React.Component<IProps> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <Column
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                width='stretch'
                spacing={this.styleConfig.spacing}
            >
                {this.renderFacts()}
            </Column>
        );
    }

    private renderFacts = () => {
        const { element } = this.props;

        if (!element || !element.isValue()) {
            return undefined;
        }

        if (element.facts) {
            return element.facts.map((fact, index) => (
                <FactView
                    key={index}
                    vIndex={0}
                    hIndex={index}
                    element={fact}
                />
            ));
        }
    }
}
