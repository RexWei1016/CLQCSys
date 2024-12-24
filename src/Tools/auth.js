import config from '../Setting/config';

const loginUrl = config.loginUrl;

// 登入功能
export async function login(userName, password) {
  try {
    const response = await fetch(`${loginUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    if (response.status === 401) {
      throw new Error('登入失敗，帳號或密碼不正確');
    }

    if (!response.ok) {
      throw new Error('登入失敗，請稍後再試');
    }

    const data = await response.json();

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
