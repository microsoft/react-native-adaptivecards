import { Component, ComponentClass } from 'react';
import { IAdaptiveCardProps } from './Views/Root';

interface AdaptiveCardClass<P = {}> extends ComponentClass<P> {
    new(props: P, context?: any): AdaptiveCardClass<P, ComponentState>;
}

declare const AdaptiveCard: AdaptiveCardClass<IAdaptiveCardProps>;

export default AdaptiveCard;
