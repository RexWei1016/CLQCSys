import React from 'react';
import styles from './QCmain.module.css';

const DocumentSelector = ({ documents, selectedDocument, handleDocumentChange, formatDate }) => (
    <div className={styles.inputGroup}>
        <label className={styles.label}>選擇單據:</label>
        <select value={selectedDocument} onChange={handleDocumentChange} className={styles.input}>
            <option value="">請選擇單據</option>
            {documents.map((doc) => (
                <option key={doc.inspectionDocumentID} value={doc.inspectionDocumentID}>
                    {doc.inspectionDocumentID} - {formatDate(doc.createdDate)}
                </option>
            ))}
        </select>
    </div>
);

export default DocumentSelector;
