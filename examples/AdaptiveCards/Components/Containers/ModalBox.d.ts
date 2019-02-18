import * as React from 'react';
interface IProps {
    show: boolean;
    onShow: () => void;
    onBackgroundPress?: () => void;
    onRequestClose?: () => void;
}
export declare class ModalBox extends React.Component<IProps> {
    constructor(props: IProps);
    render(): JSX.Element;
    private onBackgroundPress;
    private onRequestClose;
    private onShow;
}
export {};
