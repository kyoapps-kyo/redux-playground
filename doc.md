## 基础使用

对照流程图实现代码
![流程图](https://cloud.kyoapps.com/images/20230705151830.png)
### 1. 创建Store
```ts
// src/redux/store.ts
    import { createStore } from "redux";
    import LanguageReducer from "./languageReducer";

    const store = createStore(LanguageReducer) //createStore(reducer, [initialState], enhancer)

    export default store
```
### 2. Actions
```ts
    // src/redux/languageReducer.ts
    import i18n from "i18next";
    export interface LanguageState {
        language: "zh" | "en"
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
```
### 3. 分发和订阅
```ts
    // src/components/language/Language.tsx
    import React from "react";
    // import { LanguageState } from "../../redux/languageReducer";
    import store from "../../redux/store";

    const clickHandler = (e) =>{
        const { dispatch } = store
        const key = e.target.getAttribute("data-key")
        console.log(key);
        const action = {
            type: "change",
            payload: key
        }
        dispatch(action)
    }

    export const Language : React.FC = ()=>{
        return (
            <div onClick={clickHandler}>
                <button 
                    className=" border p-2 rounded-lg hover:bg-slate-100 active:bg-slate-300"
                    data-key="zh"
                >
                    Chinese
                </button>
                <button 
                    className=" border p-2 rounded-lg hover:bg-slate-100 active:bg-slate-300"
                    data-key="en"
                >
                    English
                </button>
            </div>
        )
    }
```
```ts
    // src/App.tsx
    import React, { useState } from 'react';
    import './App.css';
    import { Language } from './components/'
    import { useTranslation } from 'react-i18next'
    import store from './redux/store'

    const App: React.FC = () => {
    const { t } = useTranslation()
    const [l, setL] = useState({ language: store.getState().language })
    store.subscribe(() => {
        setL({
        language: store.getState().language
        })
    })
    
    return (
        <div className="flex justify-center items-center flex-col h-screen">
        <Language/>
        <h1 className="text-3xl font-bold underline mt-10">
        { t("hello") }
        </h1>
        </div>
    );
    }

    export default App;
```

## 重构
使用工厂模式对action进行统一创建
### 1. 创建
```ts
    // src/redux/language/languageActions.ts
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
```
### 2. 调用
```ts
    // src/redux/language/languageReducer.ts
    import i18n from "i18next";
    import { CHANGE_LANGUAGE, LanguageActionTypes } from './languageActions'

    export interface LanguageState {
        language: "zh" | "en"
    }

    const defaultState: LanguageState = {
        language: "zh"
    };
    // 因为类型定义，对action进行了类型限制，避免输入错误'action.typew'这样的低级错误出现
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
```
```ts
    // src/components/language/Language.tsx
    import React from "react";
    // import { LanguageState } from "../../redux/languageReducer";
    import store from "../../redux/store";
    import { changLanguageActionCreator } from '../../redux/language/languageActions'

    //通过creator对action进行创建
    const clickHandler = (e) =>{
        const { dispatch } = store
        const key = e.target.getAttribute("data-key")
        console.log(key);
        const action = changLanguageActionCreator(key)
        dispatch(action)
    }

    export const Language : React.FC = ()=>{
        return (
            <div onClick={clickHandler}>
                <button 
                    className=" border p-2 rounded-lg hover:bg-slate-100 active:bg-slate-300"
                    data-key="zh"
                >
                    Chinese
                </button>
                <button 
                    className=" border p-2 rounded-lg hover:bg-slate-100 active:bg-slate-300"
                    data-key="en"
                >
                    English
                </button>
            </div>
        )
    }
```
## 使用 `react-redux` 一次性注入和封装
### 1. 安装
```bash
    yarn add react-redux
    yarn add -D @types/react-redux
```
### 2. 注入组件
```ts
    // src/index.tsx
    // 通过contex注入store
    // 用Provider包裹被注入的组件
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';
    import App from './App';
    import './i18n/configs';
    import { Provider } from 'react-redux'; 
    import store from './redux/store'

    const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
    );
    root.render(
    <React.StrictMode>
        <Provider store={store}>
        <App />
        </Provider>
    </React.StrictMode>
    );
```
### 3. 使用前准备
```ts
    // src/redux/hooks.ts
    // 通过 TypedUseSelectorHook 这个接口，对组件深度绑定进行剥离
    import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
    import { RootState } from './store'

    export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
    // src/redux/store.ts
    import { createStore } from "redux";
    import LanguageReducer from "./language/languageReducer";

    const store = createStore(LanguageReducer)
    // ReturnType 获取函数类型的返回值类型
    export type RootState = ReturnType<typeof store.getState>

    export default store
```
4. 使用
```ts
// src/App.tsx
    import React from 'react';
    import './App.css';
    import { Language } from './components/'
    import { useTranslation } from 'react-i18next'
    import { useSelector } from './redux/hooks';

    const App: React.FC = () => {
    const { t } = useTranslation()
    // 此处为了提高组件的复用性，将state的类型定义提取到redux/hooks里面，通过重构useSelector这个hook
    const language = useSelector(state => state.language)
    
    return (
        <div className="flex justify-center items-center flex-col h-screen">
        <Language/>
        <h1 className="text-3xl font-bold underline mt-10">
        { t("hello") }{ language === 'zh' ? ' 中文': ' English' }
        </h1>
        </div>
    );
    }

    export default App;
```
```ts
    // src/components/language/Language.tsx
    import React from "react";
    import { changLanguageActionCreator } from '../../redux/language/languageActions'
    import { useDispatch } from 'react-redux';

    export const Language : React.FC = ()=>{
        const dispatch = useDispatch()

        const clickHandler = (e) =>{
            const key = e.target.getAttribute("data-key")
            const action = changLanguageActionCreator(key)
            dispatch(action)
        }

        return (
            <div onClick={clickHandler}>
                <button 
                    className=" border p-2 rounded-lg hover:bg-slate-100 active:bg-slate-300"
                    data-key="zh"
                >
                    Chinese
                </button>
                <button 
                    className=" border p-2 rounded-lg hover:bg-slate-100 active:bg-slate-300"
                    data-key="en"
                >
                    English
                </button>
            </div>
        )
    }
```