import { createStore } from "redux";
import LanguageReducer from "./language/languageReducer";


const store = createStore(LanguageReducer)

export default store