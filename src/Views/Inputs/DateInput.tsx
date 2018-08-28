import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { DatePanel } from '../../Components/Inputs/DatePanel';
import { DateInputModel } from '../../Models/Inputs/DateInput';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    index: number;
    model: DateInputModel;
    theme: 'default' | 'emphasis';
}

interface IState {
    value: string;
    focused: boolean;
}

export class DateInputView extends React.Component<IProps, IState> {
    private mounted: boolean;
    private tempValue = '';

    constructor(props: IProps) {
        super(props);

        this.mounted = false;

        const { model } = this.props;

        if (model && model.isValueValid) {
            model.onStoreUpdate = this.onStoreUpdate;
            this.state = {
                focused: false,
                value: model.value
            };
            model.onInput(this.state.value);
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
        const { index } = this.props;

        // if (!model || !model.isValid) {
        //     return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        // }

        return (
            [
                <Button
                    key={'DateInputButton' + index}
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
                    onPress={this.onPress}
                />,
                <DatePanel
                    key={'DatePanel' + index}
                    value={this.state.value}
                    show={this.state.focused}
                    onValueChange={this.onValueChange}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                />
            ]
        );
    }

    private onValueChange = (value: string) => {
        this.tempValue = value;
    }

    private onCancel = () => {
        this.setState({
            focused: false,
        }, () => {
            this.tempValue = this.state.value;
        });
    }

    private onSave = () => {
        this.setState({
            value: this.tempValue,
            focused: false,
        }, () => {
            const { model } = this.props;

            if (model) {
                model.onInput(this.state.value);
                let callback = model.context.blurHandler;
                if (callback) {
                    callback();
                }
            }
        });
    }

    private onPress = () => {
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
        console.log('on press');
    }

    private onStoreUpdate = (value: string) => {
        this.setState({
            value: value
        });
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
        return 0;
    }
}
