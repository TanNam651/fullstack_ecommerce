import {getCookie} from "@/helpers/utils.ts";

const AuthService = {
  Login: async (data: any) => {
    const user: any = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    const response =await user.json();
    if (response.success) {
      document.cookie = `auth_token=${user.headers.get('Authorization')}; max-age=3000; path=/`
    }
    return response;
  },
  Register: async (data: any) => {
    const res: any = await fetch("http://127.0.0.1:8000/api/auth/register", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    const result: any = await res.json();
    return result;
  },
  VerifyEmail: async (data: any) => {
    const res: any = await fetch("http://127.0.0.1:8000/api/auth/verify-email", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    const result: any = await res.json();
    return result;
  },
  Authenticated: async () => {
    const token = getCookie('auth_token');
    if (token) {
      const res: any = await fetch("http://127.0.0.1:8000/api/auth/authenticated", {
        method: "GET",
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      }
      return {error: "Unauthorized"}
    }
    return {error: "token not found"}
  },
  GetVerifyExpired: async (id: string) => {
    const res: any = await fetch(`http://127.0.0.1:8000/api/auth/verify-token/${id}`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    });

    const result = await res.json();
    return result;
  }
}

export default AuthService;