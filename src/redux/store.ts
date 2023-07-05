import { createStore } from "redux";
import LanguageReducer from "./language/languageReducer";


const store = createStore(LanguageReducer)
// ReturnType 获取函数类型的返回值类型
export type RootState = ReturnType<typeof store.getState>

export default store