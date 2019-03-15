import * as React from 'react';

import { Button } from '../../Components/Inputs/Button';
import { ConfigManager } from '../../Config/ConfigManager';
import { OpenUrlActionModel } from '../../Models/Actions/OpenUrlAction';
import { ShowCardActionModel } from '../../Models/Actions/ShowCardAction';
import { SubmitActionModel } from '../../Models/Actions/SubmitAction';
import { ActionType } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: OpenUrlActionModel | ShowCardActionModel | SubmitActionModel;
    direction: 'row' | 'column';
    theme: 'default' | 'emphasis';
}

interface IState {
    disabled: boolean;
}

export class ActionView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            disabled: false,
        };
    }

    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.title + ' is not valid', theme, 'error');
        }

        return (
            <Button
                flex={1}
                title={this.title}
                color={StyleManager.getColor('accent', theme, false)}
                fontSize={StyleManager.getFontSize('default')}
                fontWeight={StyleManager.getFontWeight('bolder')}
                backgroundColor={StyleManager.getBackgroundColor(theme)}
                textHorizontalAlign='center'
                textVerticalAlign='center'
                paddingTop={12}
                paddingBottom={12}
                paddingLeft={16}
                paddingRight={16}
                onPress={this.onPress}
                disabled={this.state.disabled}
                style={this.borderStyle}
            />
        );
    }

    private onPress = () => {
        const { model } = this.props;

        if (model && model.onAction) {
            model.onAction(
                () => {
                    console.log('Action Success');
                    if (this.isOneTimeAction) {
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

    private get isOneTimeAction() {
        // tslint:disable-next-line:max-line-length
        return ConfigManager.getInstance().getConfig().mode === 'release' && this.props.model && this.props.model.type === ActionType.Submit;
    }

    private get borderWidth() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.separatorThickness;
        }
        return 0;
    }

    private get borderStyle() {
        switch (this.props.direction) {
            case 'column':
                return {
                    paddingTop: 16,
                    paddingBottom: 16,
                    borderTopWidth: this.borderWidth,
                    borderTopColor: StyleManager.separatorColor,
                };
            default:
                return {
                    paddingTop: 6,
                    paddingBottom: 6,
                    borderLeftWidth: this.borderWidth,
                    borderLeftColor: StyleManager.separatorColor,
                };
        }
    }

    // As lots of the skill team is violate the rule that title is required in all actions,
    // we apply a temp work around in client side to unblock click containers.
    /*****Fix starts here*****/
    private get title() {
        const { model } = this.props;

        // if (!model || !model.isValid) {
        //     return '';
        // }

        if (!model) {
            return '';
        }

        return model.title ? model.title.toLocaleUpperCase() : '';
    }
    /*****Fix ends here*****/
}
