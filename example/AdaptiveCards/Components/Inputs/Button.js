import * as React from 'react';
import { FlexBox } from '../Basic/FlexBox';
import { TextBlock } from '../Basic/TextBlock';
export class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(FlexBox, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, flexDirection: 'row', relativeWidth: false, flex: 1, alignSelf: 'stretch', alignItems: 'center', alignContent: 'center', justifyContent: 'center', width: 'stretch', hSpacing: 10, style: [
                {
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    backgroundColor: '#277BDF',
                },
                this.spacing,
                this.props.boxStyle
            ], onPress: this.props.onPress },
            React.createElement(TextBlock, { vIndex: 0, hIndex: 0, width: 'stretch', horizontalAlign: 'center', textStyle: [
                    {
                        textAlign: 'center',
                        color: 'white',
                    },
                    this.props.textStyle,
                ], numberOfLines: 1 }, this.props.title)));
    }
    get spacing() {
        let result = {
            marginTop: 0,
            marginLeft: 0,
        };
        if (this.props.vIndex > 0 && this.props.vSpace) {
            result.marginTop = this.props.vSpace;
        }
        if (this.props.hIndex > 0 && this.props.hSpace) {
            result.marginLeft = this.props.hSpace;
        }
        return result;
    }
}
