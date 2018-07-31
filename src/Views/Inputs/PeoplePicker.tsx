import * as React from 'react';
import { TextBlock } from '../../Components/Basic/TextBlock';
import { Column } from '../../Components/Containers/Column';
import { ModalBox } from '../../Components/Containers/ModalBox';
import { Row } from '../../Components/Containers/Row';
import { Button } from '../../Components/Inputs/Button';
import { InputBox } from '../../Components/Inputs/InputBox';
import { LinkButton } from '../../Components/Inputs/LinkButton';
import { ActionContext } from '../../Contexts/ActionContext';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { ContentElementFactory } from '../../Schema/Factories/ContentElementFactory';
import { PeoplePickerElement } from '../../Schema/Inputs/PeoplePicker';
import { IContent } from '../../Schema/Interfaces/IContent';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<PeoplePickerElement> {
    vIndex: number;
    hIndex: number;
}

interface IState {
    value: string;
    showModal: boolean;
    autoSuggestion: IContent;
}

export class PeoplePickerView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const { element } = this.props;

        if (element && element.isValid) {
            this.state = {
                value: element.value,
                showModal: false,
                autoSuggestion: undefined,
            };
            this.updateStore();
        }
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        return (
            <Row
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                spacing={0}
                width='stretch'
                height='auto'
            >
                <Button
                    vIndex={0}
                    hIndex={0}
                    vSpacing={0}
                    hSpacing={0}
                    title={this.state.value || element.placeholder}
                    onPress={this.showModal}
                    color='#333333'
                    backgroundColor='white'
                    borderColor='#777777'
                    borderRadius={4}
                    borderWidth={1}
                    textAlign='left'
                />
                {this.renderModal()}
            </Row>
        );
    }

    private renderModal() {
        return (
            <ModalBox
                show={this.state.showModal}
            >
                <Column
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    vSPacing={0}
                    width='stretch'
                    height='stretch'
                >
                    {this.renderModalHeader()}
                    {this.renderInputBox()}
                    {this.renderAutoSuggestion()}
                </Column>
            </ModalBox >
        );
    }

    private renderModalHeader() {
        return (
            <Row
                vIndex={0}
                hIndex={0}
                spacing={0}
                width='stretch'
                height='auto'
            >
                <LinkButton
                    vIndex={0}
                    hIndex={0}
                    title='CANCEL'
                    textAlign='left'
                    wrap='wrap'
                    numberOfLines={1}
                    onPress={this.closeModal}
                />
                <TextBlock
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    width='stretch'
                    fontSize={16}
                    fontWeight={'bold'}
                    color={'#333333'}
                    backgroundColor='transparent'
                    textAlign={'center'}
                    wrap={'wrap'}
                    vSpacing={0}
                    numberOfLines={1}
                >
                    {'People Picker'}
                </TextBlock>
                <LinkButton
                    vIndex={0}
                    hIndex={0}
                    title='SAVE'
                    textAlign='right'
                    wrap='wrap'
                    numberOfLines={1}
                    onPress={this.closeModal}
                />
            </Row>
        );
    }

    private renderInputBox() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        return (
            <Row
                vIndex={0}
                hIndex={0}
                spacing={0}
                width='stretch'
                height='auto'
            >
                <InputBox
                    vIndex={0}
                    hIndex={0}
                    placeholder={element.placeholder}
                    value={this.state.value}
                    onValueChange={this.onValueChange}
                    onBlur={this.onBlur}
                />
            </Row>
        );
    }

    private renderAutoSuggestion() {
        if (this.state.autoSuggestion) {
            return (
                <Row
                    vIndex={1}
                    hIndex={0}
                    spacing={0}
                    width='stretch'
                    height='auto'
                >
                    {ContentFactory.createView(this.state.autoSuggestion, 0, this.props.theme)}
                </Row>
            );
        }
        return undefined;
    }

    private closeModal = () => {
        console.log('Show Modal');
        this.onBlur();
        this.setState({
            showModal: false,
        });
    }

    private showModal = () => {
        console.log('Show Modal');
        this.onFocus();
        this.setState({
            showModal: true,
        });
    }

    private onValueChange = (value: string) => {
        this.setState({
            value: value
        }, () => this.showAutoSuggestion(value));
    }

    private onBlur = () => {
        console.log('PeoplePickerView onBlur');
        let callback = HostContext.getInstance().getHandler('blur');
        if (callback) {
            callback();
        }
    }

    private onFocus = () => {
        console.log('PeoplePickerView onBlur');
        let callback = HostContext.getInstance().getHandler('focus');
        if (callback) {
            callback();
        }
    }

    private showAutoSuggestion = (input: string) => {
        const { element } = this.props;

        FormContext.getInstance().updateField(
            'contact_name',
            this.state.value,
            this.props.element.validate(this.state.value)
        );

        if (element && element.isValid) {
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(
                element.action,
                this.onSuggestionReceived,
                this.onSuggestionError
            );
            if (callback) {
                callback();
            }
        }
    }

    private onSuggestionReceived = (json: any) => {
        if (json) {
            this.setState({
                autoSuggestion: ContentElementFactory.create(json, this.props.element)
            });
        }
    }

    private onSuggestionError = (error: any) => {
        console.log(error);
    }

    private updateStore() {
        FormContext.getInstance().updateField(
            this.props.element.id,
            this.state.value,
            this.props.element.validate(this.state.value)
        );
    }
}
