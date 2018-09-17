import * as React from 'react';

import { Button } from '../../Components/Inputs/Button';
import { CheckList } from '../../Components/Inputs/CheckList';
import { ChoicePanel } from '../../Components/Inputs/ChoicePanel';
import { RadioList } from '../../Components/Inputs/RadioList';
import { ChoiceSetModel } from '../../Models/Inputs/ChoiceSet';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: ChoiceSetModel;
    theme: 'default' | 'emphasis';
}

interface IState {
    value: string;
    selected: string[];
    focused: boolean;
}

export class ChoiceSetView extends React.Component<IProps, IState> {
    private mounted: boolean;

    constructor(props: IProps) {
        super(props);

        this.mounted = false;

        const { model } = this.props;

        if (model && model.isValueValid) {
            model.onStoreUpdate = this.onStoreUpdate;
            this.state = {
                value: model.value,
                focused: false,
                selected: model.parseSelected(),
            };
        }
    }

    public componentDidMount() {
        this.mounted = true;
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    // tslint:disable-next-line:max-line-length
    public setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void) {
        if (this.mounted) {
            super.setState(state, callback);
        }
    }

    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

        if (model.style === 'compact') {
            return this.renderChoicePanel();
        } else {
            if (model.isMultiSelect) {
                return this.renderCheckList();
            } else {
                return this.renderRadioList();
            }
        }
    }

    private renderChoicePanel() {
        const { model, index } = this.props;

        return (
            [
                <Button
                    key={'ChoiceSetInputButton' + index}
                    title={this.state.value}
                    color={this.color}
                    backgroundColor={this.backgroundColor}
                    borderColor={this.borderColor}
                    borderRadius={4}
                    borderWidth={1}
                    height={this.height}
                    fontSize={this.fontSize}
                    fontWeight={this.fontWeight}
                    textHorizontalAlign='center'
                    textVerticalAlign='center'
                    marginTop={this.spacing}
                    paddingLeft={this.paddingHorizontal}
                    paddingRight={this.paddingHorizontal}
                    paddingTop={this.paddingVertical}
                    paddingBottom={this.paddingVertical}
                    onPress={this.onPanelButtonPress}
                />,
                <ChoicePanel
                    key={'DatePanel' + index}
                    choices={model.choices}
                    selected={this.state.selected}
                    show={this.state.focused}
                    onChoose={this.onValueChange}
                    onClose={this.onPanelClose}
                />
            ]
        );
    }

    private renderCheckList() {
        const { model, theme } = this.props;

        return (
            <CheckList
                choices={model.choices}
                selected={this.state.selected}
                onChoose={this.onValueChange}
                theme={theme}
            />
        );
    }

    private renderRadioList() {
        const { model, theme } = this.props;

        let selected: string;
        if (this.state.selected && this.state.selected.length > 0) {
            selected = this.state.selected[0];
        } else {
            selected = undefined;
        }

        return (
            <RadioList
                choices={model.choices}
                selected={selected}
                onChoose={this.onValueChange}
                theme={theme}
            />
        );
    }

    private onValueChange = (value: string) => {
        const { model } = this.props;

        if (model) {
            this.setState({
                focused: false,
            }, () => {
                model.onInput(value);
            });
        }
    }

    private onStoreUpdate = (value: string) => {
        console.log(value);
        this.setState({
            value: value,
            selected: this.props.model.parseSelected(),
        });
    }

    private onPanelClose = () => {
        this.setState({
            focused: !this.state.focused,
        });
    }

    private onPanelButtonPress = () => {
        this.setState({
            focused: !this.state.focused,
        }, () => {
            const { model } = this.props;

            if (model) {
                if (this.state.focused) {
                    let callback = model.context.focusHandler;
                    if (callback) {
                        callback();
                    }
                } else {
                    let callback = model.context.blurHandler;
                    if (callback) {
                        callback();
                    }
                }
            }
        });
        console.log('ChoiceSet onPress');
    }

    private get fontSize() {
        return StyleManager.getFontSize('default');
    }

    private get fontWeight() {
        return StyleManager.getFontWeight('default');
    }

    private get paddingVertical() {
        return 12;
    }

    private get paddingHorizontal() {
        return 12;
    }

    private get numberOfLine() {
        return 1;
    }

    private get height() {
        return this.fontSize * this.numberOfLine + this.paddingVertical * 2 + 2;
    }

    private get color() {
        if (this.state.focused) {
            return StyleManager.getInputFocusColor(this.props.theme);
        } else {
            return StyleManager.getInputColor(this.props.theme);
        }
    }

    private get backgroundColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBackgroundColor(this.props.theme);
        } else {
            return StyleManager.getInputBackgroundColor(this.props.theme);
        }
    }

    private get borderColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBorderColor(this.props.theme);
        } else {
            return StyleManager.getInputBorderColor(this.props.theme);
        }
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return StyleManager.getSpacing('default');
    }
}
