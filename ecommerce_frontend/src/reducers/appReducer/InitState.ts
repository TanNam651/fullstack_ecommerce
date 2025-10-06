export  interface IState{
    Name:string,
    // Author:string,
    Role: "ADMIN"|"USER",
    IsAuthenticated:boolean
}

export const InitState:IState ={
    Name:"",
    // Author:"NAM",
    Role:"ADMIN",
    IsAuthenticated:false
}