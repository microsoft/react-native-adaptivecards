import { Component, ComponentClass } from 'react';
import { ISVGRenderer } from './HostRenderer/HostRenderer';

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
    registerSVGRenderer(renderer: ISVGRenderer): void;
}

declare const AdaptiveCard: AdaptiveCardClass<AdaptiveCardsProps>;

export default AdaptiveCard;
