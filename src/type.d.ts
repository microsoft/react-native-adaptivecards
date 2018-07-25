import { Component, ComponentClass } from 'react';

interface AdaptiveCardsProps {
    adaptiveCard: any;
    onSubmit?: (data: any) => void;
    onOpenUrl?: (url: string) => void;
    onCallback?: (url: string, parameters: { [key: string]: string }) => Promise<any>;
    onFocus?: () => void;
    onBlur?: () => void;
}

export class AdaptiveCard extends ComponentClass<AdaptiveCardsProps> {
    public static registerCustomElementRender(type: string, renderer: (data: any) => JSX.Element);
}
