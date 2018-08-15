import * as React from 'react';
import { ImageBlock } from '../../Components/Basic/ImageBlock';
import { ActionContext } from '../../Contexts/ActionContext';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageUtils } from '../../Utils/ImageUtils';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = () => {
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
            if (callback) {
                callback();
            }
        };
        this.onLayout = (event) => {
            let ratio = this.state.width > 0 && this.state.height > 0 ? this.state.width / this.state.height : 1;
            let width = event.nativeEvent.layout.width;
            if (width !== 0 && width !== this.state.width) {
                this.setState({
                    width: width,
                    height: width / ratio
                });
            }
        };
        this.onImageSizeError = (error) => {
            console.log(error);
            this.setState({
                loaded: false,
            });
        };
        this.onImageSize = (size) => {
            if (size) {
                this.setState({
                    loaded: true,
                    width: size.width,
                    height: size.height,
                });
            }
        };
        this.state = {
            loaded: false,
            width: 0,
            height: 0,
        };
    }
    componentDidMount() {
        const { element, size, maxWidth, maxHeight } = this.props;
        if (element && element.isValid) {
            ImageUtils.fetchSize(element.url, size || element.size, { width: maxWidth, height: maxHeight }, this.onImageSize, this.onImageSizeError);
        }
    }
    render() {
        const { element, spacing } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.url + ' is not valid', 'error');
        }
        if (this.state.loaded) {
            return (React.createElement(ImageBlock, { url: element.url, alt: element.altText, flex: this.flex, alignSelf: StyleManager.getHorizontalAlign(element.horizontalAlignment), width: this.state.width, height: this.state.height, onPress: element.selectAction ? this.onPress : undefined, onLayout: this.onLayout, marginTop: this.spacing, marginLeft: spacing, mode: element.style === 'person' ? 'avatar' : 'default' }));
        }
        return null;
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
    get flex() {
        const { element, size } = this.props;
        if (!element || !element.isValid) {
            return undefined;
        }
        let finalSize = StyleManager.getImageSize(size || element.size);
        if (finalSize === 'stretch') {
            return 1;
        }
        return 0;
    }
}
