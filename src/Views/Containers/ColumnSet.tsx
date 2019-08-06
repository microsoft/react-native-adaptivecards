import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
import { ConfigManager } from '../../Config/ConfigManager';
import { ColumnSetModel } from '../../Models/Containers/ColumnSet';
import { ActionType } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { ColumnView } from './Column';

interface IProps {
    index: number;
    model: ColumnSetModel;
    theme: 'default' | 'emphasis';
}

interface IState {
    disabled: boolean;
}

export class ColumnSetView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            disabled: false,
        };
    }

    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

        if (model.selectAction) {
            return this.renderTouchableBlock();
        } else {
            return this.renderNonTouchableBlock();
        }
    }

    private renderTouchableBlock = () => {
        return (
            <Touchable
                onPress={this.onPress}
                disabled={this.state.disabled}
                accessibilityRole='button'
                style={{
                    flex: this.flex,
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    marginTop: this.spacing,
                }}
            >
                {this.renderContent()}
            </Touchable>
        );
    }

    private renderNonTouchableBlock = () => {
        return (
            <View
                style={{
                    flex: this.flex,
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    marginTop: this.spacing
                }}
            >
                {this.renderContent()}
            </View>
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
        const { model } = this.props;

        if (!model || !model.columns || model.columns.length === 0) {
            return undefined;
        }

        return model.columns.map((column, index) => (
            <ColumnView
                key={index}
                index={index}
                model={column}
                theme={this.props.theme}
            />
        ));
    }

    private onPress = () => {
        const { model } = this.props;

        if (model && model.selectAction && model.selectAction.onAction) {
            model.selectAction.onAction(
                () => {
                    console.log('Action Success');
                    if (this.hasOneTimeAction) {
                        this.setState({
                            disabled: true,
                        });
                    }
                },
                (error) => {
                    console.log('Action Failed >> ', error);
                }
            );
        }
    }

    private get hasOneTimeAction() {
        // tslint:disable-next-line:max-line-length
        return ConfigManager.getInstance().getConfig().mode === 'release' && this.props.model.selectAction && this.props.model.selectAction.type === ActionType.Submit;
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
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
