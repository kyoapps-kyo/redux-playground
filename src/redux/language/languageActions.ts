export const CHANGE_LANGUAGE = 'change_language'

// 统一创建action 避免低级错误

interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE,
    payload: 'zh' | 'en'
}

// 混合类型使用 | 
export type LanguageActionTypes = ChangeLanguageAction

export const changLanguageActionCreator = (languageCode: 'zh' | 'en'): ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: languageCode
    }
}