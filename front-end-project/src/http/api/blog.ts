import serviceAxios from "../index";

export const getBlogList = (params?) => {
  return serviceAxios({
    url: "/api/blog/list",
    method: "get",
    params,
  });
};

export const getBlogDetail = (params?) => {
  return serviceAxios({
    url: "/api/blog/detail",
    method: "get",
    params,
  });
};

export const createBlog = (params?) => {
  return serviceAxios({
    url: "/api/blog/new",
    method: "post",
    params,
  });
};

export const updateBlog = (params?) => {
  return serviceAxios({
    url: "/api/blog/update",
    method: "post",
    params,
  });
};

export const deleteBlog = (params?) => {
  return serviceAxios({
    url: "/api/blog/del",
    method: "post",
    params,
  });
};