
import { callApi } from './apiUtils';  // 使用已經存在的 callApi 函式
import config from '../Setting/config';

const apiUrl = config.apiUrl;


export async function getDeptPendingDocs(department) {
    try {
      const url = `${apiUrl}/api/FormManagement/incomplete-documents/department/${encodeURIComponent(department)}`;
      return await callApi(url, {
        method: 'GET',
      });
    } catch (error) {
      console.error('Error fetching incomplete documents:', error);
      throw error;
    }
  }

  
export async function getCategoriesByForm(formId) {
    try {
        const url = `${apiUrl}/api/FormManagement/forms/${encodeURIComponent(formId)}/categories`;
        return await callApi(url, {
            method: 'GET',
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}


export async function getItemsByFormAndCategory(formId, categoryId) {
    try {
        const url = `${apiUrl}/api/FormManagement/forms/${encodeURIComponent(formId)}/categories/${encodeURIComponent(categoryId)}/items`;
        return await callApi(url, {
            method: 'GET',
        });
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}


export async function getStandardValue(itemId, checkLevel) {
    try {
        const url = `${apiUrl}/api/RecordMain/standard-value/${encodeURIComponent(itemId)}/${encodeURIComponent(checkLevel)}`;
        return await callApi(url, {
            method: 'GET',
        });
    } catch (error) {
        console.error('Error fetching standard value:', error);
        throw error;
    }
}

// 儲存檢測紀錄的 API 請求
export async function saveInspectionRecord(data) {
    try {
        const url = `${apiUrl}/api/RecordMain/inspection-record`;
        return await callApi(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),  // 傳送的資料需轉換為 JSON 格式
        });
    } catch (error) {
        console.error('Error saving inspection record:', error);
        throw error; // 將錯誤傳遞出去以便在組件中處理
    }
}