import { createContext } from 'react';

export interface IAuthContext {
  logout: () => void;
  admin: boolean;
  isAuth: boolean;
}

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  admin: false,
  logout: null,
});

export default AuthContext;