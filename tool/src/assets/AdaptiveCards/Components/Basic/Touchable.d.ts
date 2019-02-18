import * as React from 'react';
import { AccessibilityRole, LayoutChangeEvent } from 'react-native';
interface IProps {
    testId?: string;
    disabled?: boolean;
    style?: object;
    accessibilityLabel?: string;
    accessibilityRole?: AccessibilityRole;
    hitSlop?: object;
    activeOpacity?: number;
    onPress: (data: any) => void;
    onLongPress?: (data: any) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
}
export declare class Touchable extends React.Component<IProps> {
    private testId;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private onPress;
}
export {};
