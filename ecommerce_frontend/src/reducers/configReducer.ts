import {settings} from "@/helpers/config.ts";
import {Setting} from "@/helpers/types.ts";

export type ConfigAction =
  | {
  type: "SET_CONFIG",
  payload: { key: any, value: any, setInStore: boolean },
}
  | {
  type: "RESET",
}


export const configReducer = (state: Setting, action: ConfigAction) => {
  // const {type, payload} = action;
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    case 'RESET':
      return {
        ...state,
        ...settings
      }
    default:
      return state;
  }
}