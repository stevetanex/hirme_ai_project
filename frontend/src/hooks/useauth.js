// frontend/src/hooks/useAuth.js
import { useContext } from 'react';
import AuthContext from '../contest/authcontext';

export const useAuth = () => {
    return useContext(AuthContext);
};