import { Component, ComponentClass } from 'react';

interface AdaptiveCardsProps {
    adaptiveCard: any;
    onSubmit?: (data: any) => void;
    onOpenUrl?: (url: string) => void;
    onCallback?: (url: string, parameters: { [key: string]: string }) => Promise<any>;
    onFocus?: () => void;
    onBlur?: () => void;
}
interface AdaptiveCardClass<P = {}> extends ComponentClass<P> {
    new(props: P, context?: any): AdaptiveCardClass<P, ComponentState>;
    registerCustomElementRender(type: string, renderer: (data: any) => JSX.Element);
}

declare const AdaptiveCard: AdaptiveCardClass<AdaptiveCardsProps>;

export default AdaptiveCard;
