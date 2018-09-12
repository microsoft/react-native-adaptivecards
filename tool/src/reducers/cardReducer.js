import * as Constants from '../Constants'
import config from '../static/config'
import cards from "../static/adaptive-card";
import {uuid, stringifyJson, parseJson} from "../utils/common";

const defaultSampleCards = cards.map((item) => { return {...item, card: stringifyJson(item.card), selected: true, id: uuid()}});

const default_state = {
    cards: defaultSampleCards,
    cardId: defaultSampleCards ? defaultSampleCards[0].id : '',
    config: stringifyJson(config),
    mode: 'config'
};

const initial_state = loadLocalStorage();

export default function reducer(state=initial_state, action) {
    let newState = {...state};
    switch (action.type) {
        case Constants.SET_MODE:
            newState.mode = action.mode;
            break;
        case Constants.MODIFY_CONFIG:
            newState.config = action.config;
            break;
        case Constants.MODIFY_CARD:
            newState.cards = state.cards.map((item) => {return item.id === action.id ? {...item, card: action.card} : item});
            break;
        case Constants.SET_CARD_SELECTED:
            newState.cardId = action.id;
            newState.cards = state.cards.map((item) => {return item.id === action.id ? {...item, selected: action.selected} : item});
            break;
        case Constants.REMOVE_CARD:
            newState.cardId = action.id !== state.cardId ? state.cardId : '';
            newState.cards = state.cards.filter((item) => item.id !== action.id);
            break;
        case Constants.ADD_CARD:
            newState.mode = 'card';
            newState.cards = state.cards.concat({name: action.name, card: '', selected: true, id: uuid()});
            newState.cardId = newState.cards[newState.cards.length-1].id;
            break;
        case Constants.LOAD_DEFAULT_PAYLOAD:
            newState = default_state;
            break;
        default:
            break;
    }

    localStorage.setItem('state', stringifyJson(newState));
    return newState;
}

function loadLocalStorage() {
    const localStorageState = parseJson(localStorage.getItem('state'));
    console.log(localStorageState);
    if (localStorageState && ['mode', 'cards', 'cardId', 'config'] in localStorageState) {
        return localStorageState;
    }
    return default_state;
};