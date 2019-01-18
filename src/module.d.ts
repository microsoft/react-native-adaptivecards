import { CardContext } from './Contexts/CardContext';
import { ActionResult } from './Shared/ActionResult';

interface IProps {
    payload: any;
    config?: any;
    onError: (error: any) => void;
    onInfo: (info: any) => void;
    onWarning: (warning: any) => void;
    onFocus: () => void;
    onBlur: () => void;
    onOpenUrl: (url: string, method: string, data: { [key: string]: string }) => Promise<ActionResult>;
    onSubmit: (data: any) => Promise<ActionResult>;
    onCallback: (url: string, parameters: { [key: string]: string }) => Promise<ActionResult>;
}

interface IState {
    context: CardContext;
}

export const CardRoot: React.ComponentClass<IProps, IState>;
