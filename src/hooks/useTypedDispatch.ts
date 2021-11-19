import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/types';

const useTypedDispatch = () => useDispatch<AppDispatch>();

export default useTypedDispatch;
