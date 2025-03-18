// Redux Imports
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Relative Imports
import type { RootState, AppDispatch } from './index.ts';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
