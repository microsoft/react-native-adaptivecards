import * as Constants from '../Constants'
import config from '../static/config'
import cards from "../static/adaptive-card";
import {uuid, stringifyJson} from "../utils/common";

const loadSampleCards = () => {
    return cards.map((item) => { return {...item, card: stringifyJson(item.card), selected: false, id: uuid()}});
};

const sampleCards = loadSampleCards();

export default function reducer(state={
    cards: sampleCards,
    cardId: sampleCards ? sampleCards[0].id : '',
    config: stringifyJson(config),
    mode: 'config'
}, action) {

    switch (action.type) {
        case Constants.SET_MODE:
            return {...state, mode: action.mode};
        case Constants.MODIFY_CONFIG:
            return {...state, config: action.config};
        case Constants.MODIFY_CARD:
            return {...state, cardId: action.id, cards: state.cards.map((item) => {return item.id === action.id ? {...item, card: action.card} : item})};
        case Constants.SET_CARD_SELECTED:
            return {...state, cards: state.cards.map((item) => {return item.id === action.id ? {...item, selected: action.selected} : item})};
        case Constants.REMOVE_CARD:
            return {...state, cards: state.cards.filter((item) => item.id !== action.id)};
        case Constants.ADD_CARD:
            return {...state, cards: state.cards.concat({name: action.name, card: '', selected: true, id: uuid()})};
    }

    return state;
}
