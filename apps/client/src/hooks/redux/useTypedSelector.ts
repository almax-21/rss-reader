import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../../store/types';


const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
