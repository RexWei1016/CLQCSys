import React from 'react';
import styles from './ConfirmationModal.module.css';  // 添加相應的 CSS 文件來設置樣式

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <div className={styles.buttonGroup}>
                    <button onClick={onConfirm} className={styles.confirmButton}>確認</button>
                    <button onClick={onCancel} className={styles.cancelButton}>取消</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
