import React from 'react';
import {
    Text,
} from 'react-native';
import { FlexBox } from './FlexBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    vSpacing?: number;
    hSpacing?: number;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    wrap?: 'wrap' | 'nowrap';
    horizontalAlign?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    width: 'auto' | 'stretch';
    onPress?: () => void;
    numberOfLines?: number;
    boxStyle?: any;
    textStyle?: any;
    containerWidth?: number;
    containerHeight?: number;
}

interface IState {
    containerWidth: number;
    width: 'auto' | 'stretch' | number;
}

export class TextBlock extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            width: 'stretch',
            containerWidth: 0,
        };
    }

    public componentDidUpdate() {
        if (this.state.containerWidth === 0) {
            let fontSize = this.props.fontSize || 14;
            let width = 0;
            if (this.props.children && typeof this.props.children === 'string') {
                width = this.props.children.length * fontSize;
            }
            this.setState({
                width: width,
            });
        } else {
            if (this.props.width === 'auto' || this.props.width === 'stretch') {
                this.setState({
                    width: this.state.width
                });
            }
            if (typeof this.state.width === 'number' && this.state.containerWidth <= this.state.width) {
                this.setState({
                    width: this.state.containerWidth
                });
            }
        }
    }

    public render() {
        return (
            <FlexBox
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                flexDirection='row'
                relativeWidth={false}
                width={this.calcWidth}
                vSpacing={this.props.vSpacing}
                hSpacing={this.props.hSpacing}
                alignSelf='stretch'
                alignItems='stretch'
                alignContent='stretch'
                justifyContent={'center'}
                onPress={this.props.onPress}
                style={[
                    {
                        backgroundColor: this.props.backgroundColor
                    },
                    this.props.boxStyle
                ]}
                onLayoutChange={this.onLayout}
            >
                <Text
                    style={[
                        {
                            color: this.props.color,
                            fontFamily: this.props.fontFamily,
                            fontSize: this.props.fontSize,
                            fontWeight: this.props.fontWeight,
                            textAlign: this.props.textAlign,
                            flex: 1,
                            flexWrap: this.props.wrap,
                            backgroundColor: this.props.backgroundColor,
                        },
                        this.props.textStyle,
                    ]}
                    numberOfLines={this.props.numberOfLines}
                    onPress={this.props.onPress}
                >
                    {this.props.children}
                </Text>
            </FlexBox>
        );
    }

    private onLayout = (width: number, height: number) => {
        this.setState({ containerWidth: width });
    }

    private get calcWidth() {
        if (this.state.containerWidth === 0) {
            let fontSize = this.props.fontSize || 14;
            if (this.props.children && typeof this.props.children === 'string') {
                return this.props.children.length * fontSize;
            }
        }
        return this.state.width;
    }
}
