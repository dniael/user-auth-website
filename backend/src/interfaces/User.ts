export interface User {
    username: string,
    email: string,
    password: string
    resetPassToken: string 
    tokenExpireDate: Date | string
}