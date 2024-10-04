import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import React from "react";

export type User = {
    name: string,
    email: string,
    picture:string,
    _id:string
}

export interface UserContextInterface {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

const defalutState = {
    user: {
        name: "",
        email: "",
        picture: "",
        _id: "",
    },
    setUser: (user: User) => {}
} as UserContextInterface

export const UserContext = createContext(defalutState)

type UserProvideProps = {
    children: ReactNode
}

export const UserContextProvider = ({children}: UserProvideProps) =>{
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        picture: "",
        _id: "",
    })
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}