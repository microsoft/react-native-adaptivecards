import * as React from 'react';

import {
    Image,
} from 'react-native';
import { Dimension } from '../../../Shared/Types';
import { ImageUtils } from '../../../Utils/ImageUtils';

interface IProps {
    source: string;
    label?: string;
    maxWidth?: number;
    maxHeight?: number;
}

interface IState {
    width: number;
    height: number;
    loaded: boolean;
}

export class FitImage extends React.Component<IProps, IState> {
    private mounted: boolean;
    
    constructor(props: IProps) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            loaded: false
        };
    }

    public componentDidMount() {
        this.mounted = true;

        this.fetchImageSize();
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    // tslint:disable-next-line:max-line-length
    public setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void) {
        if (this.mounted) {
            super.setState(state as any, callback);
        }
    }

    public render() {  
        if (this.props.source && this.state.loaded) {
            return (
                <Image 
                    accessibilityLabel={this.props.label ? this.props.label : ''}
                    source={{uri: this.props.source}} 
                    style={{width: this.state.width, height: this.state.height}}
                />
            );
        } else {
            return null;
        }
    }
    
    private fetchImageSize = () => {
        const { source, maxWidth, maxHeight } = this.props;

        if (source) {

            ImageUtils.fetchSize(
                source,
                'auto',
                { width: maxWidth, height: maxHeight },
                this.onImageSize,
                this.onImageSizeError
            );
        }
    }

    private onImageSizeError = (error: any) => {
        console.log('fitimage error with the uri: ' + this.props.source);
    }

    private onImageSize = (size: Dimension) => {
        if (size) {
            this.setState({
                loaded: true,
                width: size.width,
                height: size.height,
            }, null);
        }
    }
}
