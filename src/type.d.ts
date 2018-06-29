import { ComponentClass } from 'react';
import { DecStyleConfig } from './Views/Styles/DecStyleConfig';

interface AdaptiveCardsProps {
    adaptiveCard: any;
    overrideStyle?: DecStyleConfig;
    onSubmit?: (data: any) => void;
}

declare const AdaptiveCardView: ComponentClass<AdaptiveCardsProps>;
export default AdaptiveCardView;
