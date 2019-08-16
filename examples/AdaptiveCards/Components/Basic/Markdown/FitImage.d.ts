import * as React from 'react';
interface IProps {
    source: string;
    label?: string;
    maxWidth?: number;
    maxHeight?: number;
}
interface IState {
    width: number;
    height: number;
    loaded: boolean;
}
export declare class FitImage extends React.Component<IProps, IState> {
    private mounted;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void): void;
    render(): JSX.Element;
    private fetchImageSize;
    private onImageSizeError;
    private onImageSize;
}
export {};
