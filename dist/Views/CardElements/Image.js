import * as React from 'react';
import { Image } from '../../Components/Basic/Image';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageUtils } from '../../Utils/Image';
import { SelectActionView } from '../CardProps/SelectAction';
export class ImageView extends React.Component {
    constructor(props) {
        super(props);
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
            const { model, context } = this.props;
            if (model && context) {
                let handler = context.host.onInfo;
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
                const { model, context } = this.props;
                if (model && context) {
                    let handler = context.host.onError;
                    if (handler) {
                        handler(`AdaptiveCard >> Image Get Size Failed >> ${model.url} >> ${error.message}`);
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
                }, () => {
                    const { model, context } = this.props;
                    if (model && context) {
                        let handler = context.host.onInfo;
                        if (handler) {
                            handler(`AdaptiveCard >> Image Get Size Success >> ${model.url}`);
                        }
                    }
                });
            }
        };
        this.fetchImageSize = () => {
            const { model, context, size, maxWidth, maxHeight } = this.props;
            if (model) {
                if (context) {
                    let handler = context.host.onInfo;
                    if (handler) {
                        handler(`AdaptiveCard >> Start Load Image >> ${model.url}`);
                    }
                }
                ImageUtils.fetchSize(model.url, size || model.size, { width: maxWidth, height: maxHeight }, context.config, this.onImageSize, this.onImageSizeError);
            }
        };
        this.state = {
            loaded: false,
            width: 0,
            height: 0,
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
        const { model, context, spacing, theme } = this.props;
        if (this.state.loaded) {
            return (React.createElement(SelectActionView, { index: 0, theme: theme, model: model.selectAction, context: context, onLayout: this.onLayout, style: {
                    flex: this.flex,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: StyleManager.getHorizontalAlign(model.horizontalAlignment),
                    marginTop: this.spacing,
                    marginLeft: spacing,
                } },
                React.createElement(Image, { url: model.url, host: context.config.baseUrl, alt: model.alt, width: this.state.width, height: this.state.height, onLoad: this.onImageLoad, onError: this.onImageError, mode: model.style === 'person' ? 'avatar' : 'default' })));
        }
        return null;
    }
    get flex() {
        const { model, size, context } = this.props;
        if (!model) {
            return undefined;
        }
        let finalSize = StyleManager.getImageSize(size || model.size, context.config);
        if (finalSize === 'stretch') {
            return 1;
        }
        return 0;
    }
    get spacing() {
        if (this.props.model.separator) {
            return 0;
        }
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.context.config);
        }
        return 0;
    }
}
