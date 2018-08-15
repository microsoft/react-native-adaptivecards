import * as React from 'react';
import { Text } from 'react-native';
export class TextBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(Text, { accessible: true, style: [
                {
                    color: this.props.color,
                    fontFamily: this.props.fontFamily,
                    fontSize: this.props.fontSize,
                    fontWeight: this.props.fontWeight,
                    flexWrap: this.props.wrap,
                    backgroundColor: this.props.backgroundColor,
                    textAlign: this.props.textAlign,
                    width: this.props.width,
                    height: this.props.height,
                    marginTop: this.props.marginTop,
                    marginRight: this.props.marginRight,
                    marginBottom: this.props.marginBottom,
                    marginLeft: this.props.marginLeft,
                    paddingTop: this.props.paddingTop,
                    paddingRight: this.props.paddingRight,
                    paddingBottom: this.props.paddingBottom,
                    paddingLeft: this.props.paddingLeft,
                },
            ], numberOfLines: this.props.numberOfLines }, this.props.children));
    }
}
