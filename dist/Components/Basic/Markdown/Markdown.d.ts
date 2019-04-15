import * as React from 'react';
import { StyleProp, TextProps, TextStyle } from 'react-native';
interface IProps extends TextProps {
    markdownStyles?: StyleProp<TextStyle>;
}
export declare class Markdown extends React.Component<IProps> {
    render(): JSX.Element;
    private renderList;
    private renderListItem;
    private renderListBullet;
    private renderLink;
    private renderText;
    private renderNode;
    private openUrl;
}
export {};
