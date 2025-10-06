import AuthService from "@/services/AuthService.ts";
import {RegisterSchema} from "@/schemas";
import {setLocal} from "@/helpers/utils.ts";

export const Actions: any = {
  UserLogin: (inputLogin: any) => async (dispatch: any, getState: any) => {
    const userRes: any = await AuthService.Login(inputLogin);
    console.log(userRes);
    if (userRes?.success) {
      dispatch({
        type: "ChangeAuthentication",
        isAuthentication: true,
        Role: userRes.user.role,
        Name: userRes.user.name
      });

      return {
        success: userRes.success,
        role:userRes.user.role
      };
    }
    return {error: userRes.error};
  },
  UserRegister: (inputRegister: typeof RegisterSchema) => async (dispatch: any, getState: any
  ) => {
    const response = await AuthService.Register(inputRegister);
    console.log(response);
    return {
      success: "Thanh cong",
      expire_id: response.id_verify
    }
  },
  // viet lai
  UserNewVerify: (inputVerify: any) => async (dispatch: any, getState: any) => {
    const response = await AuthService.VerifyEmail(inputVerify);
    console.log(response);
    return {
      success: "Verify"
    }
  },
  UserAuthenticated: () => async (dispatch: any, getState: any) => {
    const response = await AuthService.Authenticated();
    if (response.success){
      dispatch({
        type: "ChangeAuthentication",
        isAuthentication: true,
        Role: response.user.role,
        Name: response.user.name
      });
      return {success:response.success, role:response.user.role}
    }
    return response;
  },
  UserGetExpired: (id: string) => async (dispatch: any, getState: any) => {
    const response = await AuthService.GetVerifyExpired(id);
    console.log(response);
    return response;
  }
};