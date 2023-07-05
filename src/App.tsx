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
