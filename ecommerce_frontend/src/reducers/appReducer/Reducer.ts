import {IState, InitState} from "./InitState.ts";


export const Reducer = (state:IState = InitState, action:any)=>{
    switch (action.type){
        case "ChangeAuthentication":
            return {
                ...state,
                IsAuthenticated: action.isAuthentication,
                Role:action.Role.toUpperCase(),
                Name:action.Name
            };
        default:
            return state;

    }
}

