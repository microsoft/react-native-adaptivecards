import * as React from 'react';
import { Image } from 'react-native';

interface IProps {
    url: string;
    alt?: string;
}

interface IState {
    loaded: boolean;
    width: number;
    height: number;
}

export class ImageBlock extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            loaded: false,
            width: 0,
            height: 0
        };
    }

    public componentWillMount() {
        Image.getSize(this.props.url, (width, height) => {
            this.setState({
                width: width,
                height: height,
            });
        }, (err) => {
            console.log(err);
        });
    }

    public render() {
        return (
            <Image
                source={{ uri: this.props.url }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                resizeMethod='resize'
                resizeMode='contain'
            />
        );
    }
}
