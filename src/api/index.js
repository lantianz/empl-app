import http from "../utils/request";

// 标准信息
export const getStandInfo = (params) => {
    return http.get('/api/standInfo/getStandInfo', params);
}

// Admin Permission...
export const adminLogin = (data) => {
    return http.post('/api/admin/login', data);
}
export const getMenu = (roleId) => {
    return http.post(`/api/permission/getMenu/${roleId}`);
}
export const check = (params) => {
    return http.get('/api/admin/check', params);
}
export const changePwd = (params) => {
    return http.put('/api/admin/changePwd', params);
}
export const adminLogout = (params) => {
    return http.post('/api/admin/logout', params);
}

// BaseInfo页...
export const getAllGraduateByPage = (params) => {
    return http.get('/api/graduate/getAllUserByPage', params);
}
export const getGraduateBySearch = (params) => {
    return http.get('/api/graduate/getUserBySearch', params);
}
export const addGraduate = (data) => {
    return http.post('/api/graduate/addUser', data);
}
export const deleteGraduate = (id) => {
    return http.delete(`/api/graduate/deleteUser/${id}`);
}
export const editGraduate = (params) => {
    return http.put('/api/graduate/editUser', params);
}

// EmplInfo页...
export const getAllEmplInfoByPage = (params) => {
    return http.get('/api/emplInfo/getAllUserByPage', params);
}
export const getEmplInfoBySearch = (params) => {
    return http.get('/api/emplInfo/getUserBySearch', params);
}
export const addEmplInfo = (data) => {
    return http.post('/api/emplInfo/addUser', data);
}
export const deleteEmplInfo = (id) => {
    return http.delete(`/api/emplInfo/deleteUser/${id}`);
}
export const deleteAllEmplInfo = (ids) => {
    return http.delete(`/api/emplInfo/deleteAllUser/${ids}`);
}
export const editEmplInfo = (params) => {
    return http.put('/api/emplInfo/editUser', params);
}

// DeptAdminInfo页...
export const getAllDeptAdminInfo = (params) => {
    return http.get('/api/admin/allDeptAdmin', params);
}
export const getDeptAdminBySearch = (params) => {
    return http.get('/api/admin/getDeptAdminBySearch', params);
}
export const addDeptAdmin = (data) => {
    return http.post('/api/admin/addDeptAdmin', data);
}
export const deleteDeptAdmin = (id) => {
    return http.delete(`/api/admin/deleteDeptAdmin/${id}`);
}
export const deleteAllDeptAdmin = (ids) => {
    return http.delete(`/api/admin/deleteAllDeptAdmin/${ids}`);
}
export const editDeptAdmin = (params) => {
    return http.put('/api/admin/editDeptAdmin', params);
}

// Account...
export const editGraduateByList = (ids, params) => {
    return http.put(`/api/graduate/editUserByList/${ids}/${params}`);
}
export const getDeptUserBySearch = (params) => {
    return http.get('/api/graduate/getDeptUserBySearch', params);
}

// 汇总与统计分页
export const getTotalTableByPage = (params) => {
    return http.get('/api/emplInfo/totalByPage', params);
}
// ByDept...
export const getByDeptTable = (params) => {
    return http.get('/api/emplInfo/byDept', params);
}

// ByMajor
export const getByMajorTable = (params) => {
    return http.get('/api/emplInfo/byMajor', params);
}

// ByType
export const getByTypeTable = (params) => {
    return http.get('/api/emplInfo/byType', params);
}

// ByPosition
export const getByPositionTable = (params) => {
    return http.get('/api/emplInfo/byPosition', params);
}

// EmplInfoTotal
export const getEmplInfoTotalTable = (params) => {
    return http.get('/api/emplInfo/emplInfoTotal', params);
}