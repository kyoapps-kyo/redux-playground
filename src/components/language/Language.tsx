import React from "react";
// import { LanguageState } from "../../redux/languageReducer";
import store from "../../redux/store";
import { changLanguageActionCreator } from '../../redux/language/languageActions'

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