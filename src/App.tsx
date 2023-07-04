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
      { t("hello") }{ l.language === 'zh' ? ' 中文': ' English' }
      </h1>
    </div>
  );
}

export default App;
