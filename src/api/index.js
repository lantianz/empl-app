import http from "../utils/request";

// Login
export const adminLogin = (data) => {
    return http.post('/api/admin/login', data);
}
export const getMenu = (roleId) => {
    return http.post(`/api/permission/getMenu/${roleId}`);
}
export const adminLogout = (params) => {
    return http.post('/api/admin/logout', params);
}

// BaseInfo页
export const getAllUserByPage = (params) => {
    return http.get('/api/graduate/getAllUserByPage', params);
}
export const getUserBySearch = (params) => {
    return http.get('/api/graduate/getUserBySearch', params);
}
export const getStandInfo = (params) => {
    return http.get('/api/standInfo/getStandInfo', params);
}
export const addUser = (data) => {
    return http.post('/api/graduate/addUser', data);
}
export const deleteUser = (id) => {
    return http.delete(`/api/graduate/deleteUser/${id}`);
}
export const editUser = (params) => {
    return http.put('/api/graduate/editUser', params);
}
