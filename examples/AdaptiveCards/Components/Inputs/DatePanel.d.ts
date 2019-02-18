import * as React from 'react';
interface IProps {
    value: string;
    show: boolean;
    onValueChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}
export declare class DatePanel extends React.Component<IProps> {
    private panel;
    componentDidUpdate(prevProps: IProps): void;
    render(): JSX.Element;
    private renderCancelButton;
    private renderSaveButton;
    private showPickerAndroid;
    private onCancel;
    private onSave;
    private onShow;
    private onDateChange;
    private readonly show;
}
export {};
