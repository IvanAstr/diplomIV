import { useCallback } from 'react';
import { $authHost, $host } from "./index";
import { useHttp } from "../hooks/http.hook";

export const useRegistration = () => {
  const { request } = useHttp();

  const registration = async (email, password) => {
    const response = await request('api/user/registration', 'POST', { email, password, role: "ADMIN" });
    return response;
  };

  return { registration };
};

export const useLogin = () => {
  const login = async (email, password) => {
    const response = await $host.post('api/user/login', { email, password });
    return response;
  };

  return { login };
};

export const useCheck = () => {
  const { request } = useHttp();

  const check = useCallback(async () => {
    const response = await $authHost.post('api/auth/registration');
    return response;
  }, []);

  return { check };
};


// import { $authHost, $host } from "./index";
// import { useHttp } from "../hooks/http.hook";

// // eslint-disable-next-line react-hooks/rules-of-hooks
// const {request} = useHttp();

// export const registration = async (email,password)=>{
//     const response = await request('/api/user/registration','POST', { email, password,role:"ADMIN" });
//     return response
// }
// export const login = async (email,password)=>{
//     const response = await $host.post('api/user/login', { email, password});
//     return response
// }
// export const check = async ()=>{
//     const response = await $host.post('api/auth/registration');
//     return response
// }