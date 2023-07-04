import i18n from "i18next";
export interface LanguageState {
    language: string
}

const defaultState: LanguageState = {
    language: "zh"
};

const mainFn = (state = defaultState, action) => {
    if(action.type === 'change'){
        i18n.changeLanguage(action.payload)
        return {
            ...state,
            language: action.payload
        }
    }
    return state
}

export default mainFn