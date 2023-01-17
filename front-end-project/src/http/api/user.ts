import serviceAxios from "../index";

export const loginBlog = (params?) => {
  return serviceAxios({
    url: "/api/user/login",
    method: "post",
    params,
  });
};