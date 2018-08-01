import * as React from 'react';
import { 
    LayoutChangeEvent, 
    TouchableOpacity, 
    View, 
    ViewStyle 
} from 'react-native';

interface IProps {
    alignContent: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
    alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    flex?: number;
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    flexWrap?: 'wrap' | 'nowrap';
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    style?: ViewStyle;
    onPress?: () => void;
    onLayoutChange?: (width: number, height: number) => void;
}

interface IState {
    width: number;
    height: number;
}

export class FlexBox extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            width: this.props.width !== undefined ? this.props.width : 0,
            height: this.props.width !== undefined ? this.props.width : 0,
        };
    }

    public render() {
        if (this.props.onPress) {
            return this.renderTouchable();
        } else {
            return this.renderNonTouchable();
        }
    }

    private renderNonTouchable() {
        return (
            <View
                style={[
                    this.selfAlignment,
                    this.childrenAlignment,
                    this.margin,
                    this.padding,
                    this.props.style
                ]}
                onLayout={this.onLayoutChange}
            >
                {this.props.children}
            </View>
        );
    }

    private renderTouchable() {
        return (
            <TouchableOpacity
                style={[
                    this.selfAlignment,
                    this.childrenAlignment,
                    this.margin,
                    this.padding,
                    this.props.style
                ]}
                onPress={this.props.onPress}
                onLayout={this.onLayoutChange}
            >
                {this.props.children}
            </TouchableOpacity>
        );
    }

    private onLayoutChange = (event?: LayoutChangeEvent) => {
        let width = event.nativeEvent.layout.width;
        let height = event.nativeEvent.layout.height;

        this.setState({
            width: width,
            height: height
        }, () => {
            if (this.props.onLayoutChange) {
                this.props.onLayoutChange(width, height);
            }
        });
    }

    private get childrenAlignment() {
        return {
            alignItems: this.props.alignItems,
            alignContent: this.props.alignContent,
            justifyContent: this.props.justifyContent,
            flexDirection: this.props.flexDirection,
            flexWrap: this.props.flexWrap,
        };
    }

    private get selfAlignment() {
        return {
            alignSelf: this.props.alignSelf,
            flex: this.props.flex,
            width: this.props.width,
            height: this.props.height,
        };
    }

    private get margin() {
        return {
            marginTop: this.props.marginTop,
            marginRight: this.props.marginRight,
            marginBottom: this.props.marginBottom,
            marginLeft: this.props.marginLeft,
        };
    }

    private get padding() {
        return {
            paddingTop: this.props.paddingTop,
            paddingRight: this.props.paddingRight,
            paddingBottom: this.props.paddingBottom,
            paddingLeft: this.props.paddingLeft,
        };
    }
}
