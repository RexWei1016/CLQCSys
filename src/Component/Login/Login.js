import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDepartments, fetchEmployeesByDepartment } from '../../Tools/departments';
import { login } from '../../Tools/auth';

function Login() {
    const [departments, setDepartments] = useState([]); // 部門列表
    const [employees, setEmployees] = useState([]); // 員工列表
    const [selectedDepartment, setSelectedDepartment] = useState(''); // 選擇的部門
    const [selectedEmployee, setSelectedEmployee] = useState(''); // 選擇的員工
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // 初次渲染時，獲取部門列表
    useEffect(() => {
        async function loadDepartments() {
            try {
                const response = await fetchDepartments();
                setDepartments(response); // 更新部門列表
            } catch (error) {
                console.error('Error fetching departments', error);
                setErrorMessage('無法加載部門');
            }
        }
        loadDepartments();
    }, []);

    // 當選擇部門變更時，呼叫 API 獲取該部門的員工列表
    useEffect(() => {
        async function loadEmployees() {
            if (selectedDepartment) {
                try {
                    const response = await fetchEmployeesByDepartment(selectedDepartment);
                    setEmployees(response); // 更新員工列表
                } catch (error) {
                    console.error('Error fetching employees', error);
                    setErrorMessage('無法加載員工');
                }
            } else {
                setEmployees([]); // 清空員工列表
            }
        }
        loadEmployees();
    }, [selectedDepartment]);

    // 登入表單提交處理
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(selectedEmployee, password); // 使用選中的員工名稱
            if (response) {
                console.log('Login successful', response);
                // 登入成功後，將部門資訊一起傳遞
                navigate('/QCmain', { state: { department: selectedDepartment } });
            }
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage(`登入失敗: ${error.message}`);
        }
    };

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>登　　入</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)} // 更新選中的部門
              required
              style={styles.input}
            >
              <option value="">選擇部門</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept.dPname}>{dept.dPname}</option>
              ))}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)} // 更新選中的員工
              required
              style={styles.input}
            >
              <option value="">選擇員工</option>
              {employees.map((emp, index) => (
                <option key={index} value={emp.emPname}>{emp.emPname}</option>
              ))}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 更新密碼
              required
              style={styles.input}
            />
          </div>
          {errorMessage && <p style={styles.error}>{errorMessage}</p>}
          <button type="submit" style={styles.button}>登入</button>
        </form>
      </div>
    );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default Login;
