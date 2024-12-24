import React from 'react';
import styles from './QCmain.module.css';

const TestValueInput = ({ testValue, handleTestValueChange }) => (
    <div className={styles.inputGroup}>
        <label className={styles.label}>檢測數據:</label>
        <input
            type="number"
            value={testValue}
            onChange={handleTestValueChange}
            className={styles.input}
            placeholder="請輸入檢測數據"
        />
    </div>
);

export default TestValueInput;
