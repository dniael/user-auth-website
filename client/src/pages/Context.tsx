import React, { createContext, PropsWithChildren, useState, useEffect } from 'react'
import Axios from 'axios'

export const myContext = createContext<any>({})
export default function Context(props: PropsWithChildren<any>) {
    const [user, setUser] = useState<any>()

    useEffect(() => {
        Axios.get('http://localhost:6969/user', { withCredentials: true }).then(res => {
            setUser(res.data)
        })
    }, [])

    return (
        <myContext.Provider value={user}>{props.children}</myContext.Provider>
    )
}
