import i18n from "i18next";
import { CHANGE_LANGUAGE, LanguageActionTypes } from './languageActions'

export interface LanguageState {
    language: "zh" | "en"
}

const defaultState: LanguageState = {
    language: "zh"
};

const mainFn = (state = defaultState, action: LanguageActionTypes) => {
    if(action.type === CHANGE_LANGUAGE){
        i18n.changeLanguage(action.payload)
        return {
            ...state,
            language: action.payload
        }
    }
    return state
}

export default mainFn