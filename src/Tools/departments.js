import { callApi } from './apiUtils';
import config from '../Setting/config';

const apiUrl = config.loginUrl;

// 獲取所有部門
export async function fetchDepartments() {
  return callApi(`${apiUrl}/departments`, {
    method: 'GET',
  });
}

// 根據部門名稱獲取員工列表
export async function fetchEmployeesByDepartment(departmentName) {
  return callApi(`${apiUrl}/departments/${encodeURIComponent(departmentName)}/employees`, {
    method: 'GET',
  });
}
