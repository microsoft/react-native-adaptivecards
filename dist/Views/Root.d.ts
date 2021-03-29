import React, { ReactNode } from 'react';
import { CardContext } from '../Contexts/CardContext';
export interface IAdaptiveCardProps {
    adaptiveCard: any;
    config?: any;
    style?: any;
    onSubmit?: (data: any) => Promise<any>;
    onOpenUrl?: (url: string, method: string, data: any) => Promise<any>;
    onCallback?: (url: string, parameters: {
        [key: string]: string;
    }) => Promise<any>;
    onFocus?: () => void;
    onBlur?: () => void;
    onError?: (error: any) => void;
    onInfo?: (info: any) => void;
    onWarning?: (warning: any) => void;
    avatarFallbackRender?: (diameter: number, altText: string, url: string) => ReactNode;
}
export declare class CardRootView extends React.Component<IAdaptiveCardProps> {
    rootCardContext: CardContext;
    constructor(props: IAdaptiveCardProps);
    shouldComponentUpdate(nextProps: any): boolean;
    render(): JSX.Element;
}
