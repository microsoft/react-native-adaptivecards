import { ComponentClass } from 'react';
import { DecStyleConfig } from './Views/Style/DecStyleConfig';

interface AdaptiveCardsProps {
    adaptiveCard: any;
    overrideStyle?: DecStyleConfig;
    onSubmit?: (data: any) => void;
    onOpenUrl?: (url: string) => void;
    onCallback?: (url: string, parameters: { [key: string]: string }) => Promise<any>;
    onFocus?: () => void;
    onBlur?: () => void;
}

declare const AdaptiveCardView: ComponentClass<AdaptiveCardsProps>;
export default AdaptiveCardView;
