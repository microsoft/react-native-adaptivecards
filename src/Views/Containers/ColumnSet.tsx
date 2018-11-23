import * as React from 'react';

import { ColumnSetNode } from '../../Models/Nodes/Containers/ColumnSet';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { SelectActionView } from '../CardProps/SelectAction';
import { ColumnView } from './Column';

interface IProps extends IViewProps<ColumnSetNode> {
}

export class ColumnSetView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            disabled: false,
        };
    }

    public render() {
        const { model, context, theme } = this.props;

        return (
            <SelectActionView
                index={0}
                theme={theme}
                model={model.selectAction}
                context={context}
                
                style={{
                    flex: this.flex,
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    justifyContent: 'flex-start',
                    marginTop: this.spacing,
                }}
            >
                {this.renderContent()}
            </SelectActionView>
        );
    }

    private renderContent = () => {
        const { model } = this.props;

        if (!model) {
            return undefined;
        }

        return this.renderColumns();
    }

    private renderColumns = () => {
        const { model, context } = this.props;

        if (!model || !model.columns || model.columns.length === 0) {
            return undefined;
        }

        return model.columns.map((column, index) => (
            <ColumnView
                key={index}
                index={index}
                model={column}
                context={context}
                theme={this.props.theme}
                
            />
        ));
    }

    private get flex() {
        const { model } = this.props;

        if (!model) {
            return 0;
        }

        if (model.height === 'stretch') {
            return 1;
        }

        return 0;
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
