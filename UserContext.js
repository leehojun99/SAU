import { createContext } from 'react';

const user = {
    userCode: '',
    userCookie: '',
}//틀을 만들어준것

export const UserContext = createContext(user);