// 通过 TypedUseSelectorHook 这个接口，对组件深度绑定进行剥离
import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from './store'

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector