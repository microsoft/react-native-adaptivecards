import * as React from 'react';
interface IProps {
    index: number;
    title: string;
    focused: boolean;
    theme: 'default' | 'emphasis';
    accessibilityLabel: string;
    onPress: (index: number) => void;
}
export declare class Label extends React.Component<IProps> {
    render(): JSX.Element;
    private onPress;
    private readonly fontSize;
    private readonly fontWeight;
    private readonly paddingVertical;
    private readonly color;
    private readonly backgroundColor;
}
export {};
