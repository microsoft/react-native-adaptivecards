import * as React from 'react';
import { Image, } from 'react-native';
import { ImageUtils } from '../../../Utils/ImageUtils';
export class FitImage extends React.Component {
    constructor(props) {
        super(props);
        this.fetchImageSize = () => {
            const { source, maxWidth, maxHeight } = this.props;
            if (source) {
                ImageUtils.fetchSize(source, 'auto', { width: maxWidth, height: maxHeight }, this.onImageSize, this.onImageSizeError);
            }
        };
        this.onImageSizeError = (error) => {
            console.log('fitimage error with the uri: ' + this.props.source);
        };
        this.onImageSize = (size) => {
            if (size) {
                this.setState({
                    loaded: true,
                    width: size.width,
                    height: size.height,
                }, null);
            }
        };
        this.state = {
            width: 0,
            height: 0,
            loaded: false
        };
    }
    componentDidMount() {
        this.mounted = true;
        this.fetchImageSize();
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    setState(state, callback) {
        if (this.mounted) {
            super.setState(state, callback);
        }
    }
    render() {
        if (this.props.source && this.state.loaded) {
            return (React.createElement(Image, { accessibilityLabel: this.props.label ? this.props.label : '', source: { uri: this.props.source }, style: { width: this.state.width, height: this.state.height } }));
        }
        else {
            return null;
        }
    }
}
