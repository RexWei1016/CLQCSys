import config from '../Setting/config';

const apiUrl = config.apiUrl;

async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshResponse = await fetch(`${apiUrl}/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });

    if (!refreshResponse.ok) {
      throw new Error('Failed to refresh token.');
    }

    const refreshData = await refreshResponse.json();
    localStorage.setItem('accessToken', refreshData.accessToken);
    localStorage.setItem('refreshToken', refreshData.refreshToken);
    return refreshData.accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // 觸發自定義事件通知登出
    const logoutEvent = new Event('logout');
    window.dispatchEvent(logoutEvent);

    throw error;
  }
}

export async function callApi(url, options) {
  try {
    if (!options.headers) {
      options.headers = {};
    }

    // 添加 accessToken 到 Authorization 標頭
    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    // 如果 accessToken 過期，則刷新 token 並重新發送請求
    if (response.status === 401) {
      await refreshToken();
      options.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
      response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Unauthorized request after token refresh.');
      }
    }

    // 檢查內容類型
    const contentType = response.headers.get('content-type');

    // 根據內容類型返回不同的結果
    if (contentType && contentType.includes('application/json')) {
      return response.ok ? await response.json() : Promise.reject(new Error('Failed to process the request.'));
    } else {
      return response.ok ? await response.text() : Promise.reject(new Error('Failed to process the request.'));
    }
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
}
export async function login(userName, password) {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    // 如果返回 401，表示登入失敗
    if (response.status === 401) {
      throw new Error('登入失敗，帳號或密碼不正確');
    }

    // 如果回應不是 ok，則拋出一般錯誤
    if (!response.ok) {
      throw new Error('登入失敗，請稍後再試');
    }

    const data = await response.json();

    // 假設後端返回 accessToken 和 refreshToken
    if (data.accessToken && data.refreshToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    } else {
      throw new Error('登入回應中缺少 token');
    }

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}



export async function fetchOrders() {
  return callApi(`${apiUrl}/api/Workflow/orders`, {
    method: 'GET',
  });
}

export async function fetchOrderById(id) {
  return callApi(`${apiUrl}/api/Workflow/${id}`, {
    method: 'GET',
  });
}

// 用於獲取料號以數字開頭的訂單
export async function fetchOrdersWithNumericPdctNo() {
  return callApi(`${apiUrl}/api/Workflow/orders/numericPdctNo`, {
    method: 'GET',
  });
}
