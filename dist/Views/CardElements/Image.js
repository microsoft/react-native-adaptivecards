import * as React from 'react';
import { ImageBlock } from '../../Components/Basic/ImageBlock';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageUtils } from '../../Utils/ImageUtils';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = () => {
            const { model } = this.props;
            if (model && model.selectAction && model.selectAction.onAction) {
                model.selectAction.onAction(() => {
                    console.log('Action Success');
                }, (error) => {
                    console.log('Action Failed >> ', error);
                });
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
        this.onImageLoad = () => {
            const { model } = this.props;
            if (model && model.context) {
                let handler = model.context.infoHandler;
                if (handler) {
                    handler(`AdaptiveCard >> Image Load Success >> ${model.url}`);
                }
            }
        };
        this.onImageError = (error) => {
            this.handleError(error);
        };
        this.onImageSizeError = (error) => {
            this.handleError(error);
        };
        this.handleError = (error) => {
            this.setState({
                loaded: false,
            }, () => {
                const { model } = this.props;
                if (model && model.context) {
                    let handler = model.context.errorHandler;
                    if (handler) {
                        handler(`AdaptiveCard >> Image Load Failed >> ${error.message}`);
                    }
                }
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
        const { model, size, maxWidth, maxHeight } = this.props;
        if (model) {
            if (model.context) {
                let handler = model.context.infoHandler;
                if (handler) {
                    handler(`AdaptiveCard >> Start load img >> ${model.url}`);
                }
            }
            ImageUtils.fetchSize(model.url, size || model.size, { width: maxWidth, height: maxHeight }, this.onImageSize, this.onImageSizeError);
        }
    }
    render() {
        const { model, spacing, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.url + ' is not valid', theme, 'error');
        }
        if (this.state.loaded) {
            return (React.createElement(ImageBlock, { url: model.url, alt: model.alt, flex: this.flex, alignSelf: StyleManager.getHorizontalAlign(model.horizontalAlignment), width: this.state.width, height: this.state.height, onPress: model.selectAction ? this.onPress : undefined, onLayout: this.onLayout, onLoad: this.onImageLoad, onError: this.onImageError, marginTop: this.spacing, marginLeft: spacing, mode: model.style === 'person' ? 'avatar' : 'default' }));
        }
        return null;
    }
    get flex() {
        const { model, size } = this.props;
        if (!model) {
            return undefined;
        }
        let finalSize = StyleManager.getImageSize(size || model.size);
        if (finalSize === 'stretch') {
            return 1;
        }
        return 0;
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return StyleManager.getSpacing('default');
    }
}
