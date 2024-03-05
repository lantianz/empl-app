import http from "../utils/request";

export const changePwd = (params) => {
    return http.put('/api/changePwd', params);
}

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

export const deleteUser = (params) => {
    return http.delete('/api/graduate/deleteUser', params);
}

export const editUser = (params) => {
    return http.put('/api/graduate/editUser', params);
}
