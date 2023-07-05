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