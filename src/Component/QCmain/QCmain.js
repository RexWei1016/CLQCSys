import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './QCmain.module.css';
import { getDeptPendingDocs, getCategoriesByForm, getItemsByFormAndCategory, getStandardValue, saveInspectionRecord } from './../../Tools/qcFunction'; 
import ConfirmationModal from './ConfirmationModal';  // 引入自訂的詢問框

import DocumentSelector from './DocumentSelector';
import CategorySelector from './CategorySelector';
import ItemList from './ItemList';
import StandardValueDisplay from './StandardValueDisplay';
import TestValueInput from './TestValueInput';

function QCmain() {
    const location = useLocation();
    const department = location.state?.department;

    const [documents, setDocuments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [standardValue, setStandardValue] = useState(null);
    const [testValue, setTestValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // 新增成功訊息
    const [showModal, setShowModal] = useState(false);  // 控制顯示自訂義確認框
    const [confirmSave, setConfirmSave] = useState(false);  // 控制是否進行最終儲存

    useEffect(() => {
        if (department) {
            getDeptPendingDocs(department)
                .then((response) => {
                    if (response.data) {
                        setDocuments(response.data);
                    } else {
                        console.error('Invalid response structure:', response);
                        setDocuments([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching documents:', error);
                    setDocuments([]);
                });
        }
    }, [department]);

    const handleDocumentChange = (e) => {
        const selectedDocId = e.target.value;
        setSelectedDocument(selectedDocId);

        setCategories([]);
        setItems([]);
        setSelectedCategory('');
        setSelectedItem(null);
        setStandardValue(null);

        const selectedDoc = documents.find(doc => doc.inspectionDocumentID === selectedDocId);
        if (selectedDoc) {
            getCategoriesByForm(selectedDoc.formID)
                .then((response) => {
                    if (response.data) {
                        setCategories(response.data);
                    } else {
                        console.error('Invalid response structure for categories:', response);
                        setCategories([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                    setCategories([]);
                });
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);

        setItems([]);
        setSelectedItem(null);
        setStandardValue(null);

        const selectedDoc = documents.find(doc => doc.inspectionDocumentID === selectedDocument);
        if (selectedDoc) {
            getItemsByFormAndCategory(selectedDoc.formID, selectedCategoryId)
                .then((response) => {
                    if (response.data) {
                        setItems(response.data);
                    } else {
                        console.error('Invalid response structure for items:', response);
                        setItems([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching items:', error);
                    setItems([]);
                });
        }
    };

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setStandardValue(null);

        getStandardValue(item.itemID, item.checkLevel)
            .then((response) => {
                if (response.data) {
                    setStandardValue(response.data);
                } else {
                    console.error('Invalid response structure for standard value:', response);
                    setStandardValue(null);
                }
            })
            .catch((error) => {
                console.error('Error fetching standard value:', error);
                setStandardValue(null);
            });
    };

    const handleTestValueChange = (e) => {
        const value = e.target.value;
        setTestValue(value);

        // 即時檢查數值是否超出範圍
        if (standardValue && (parseFloat(value) < standardValue.lowerLimit || parseFloat(value) > standardValue.upperLimit)) {
            setErrorMessage("輸入的數據超出標準範圍！");
        } else {
            setErrorMessage('');
        }
    };

    // 定義重置表單的函數
    const resetForm = () => {
        setSelectedDocument('');
        setSelectedCategory('');
        setSelectedItem(null);
        setStandardValue(null);
        setTestValue('');
        setErrorMessage('');
        setCategories([]);
        setItems([]);
    };

    // 儲存按鈕點擊處理
    const handleSave = () => {
        if (!selectedDocument || !selectedCategory || !selectedItem || !testValue) {
            setErrorMessage("請確保已選擇單據、分類、項目並輸入數據");
            return;
        }

        const testValueNumber = parseFloat(testValue);

        // 如果數據超出標準範圍，顯示自訂義的確認框
        if (testValueNumber < standardValue.lowerLimit || testValueNumber > standardValue.upperLimit) {
            setShowModal(true);
        } else {
            saveData();
        }
    };

    // 確認後執行儲存邏輯
    const saveData = () => {
        const data = {
            employeeID: 'yourEmployeeID',  // 這裡應該填入實際的員工ID
            formID: documents.find(doc => doc.inspectionDocumentID === selectedDocument)?.formID,
            categoryID: selectedCategory,
            itemID: selectedItem.itemID,
            checkLevel: selectedItem.checkLevel,
            inspectedDocId: selectedDocument,
            inputData: testValue,
            result: 0  // 根據業務邏輯設置這個值
        };

        saveInspectionRecord(data)
            .then(response => {
                if (response.data) {
                    console.log('保存成功:', response.data);
                    setShowModal(false);  // 關閉確認框
                    setConfirmSave(false);  // 重置確認標誌
                    resetForm();  // 清空表單
                    setSuccessMessage('資料已成功儲存！');  // 設置成功訊息
                    // 自動清除成功訊息
                    setTimeout(() => setSuccessMessage(''), 3000);
                } else {
                    console.error('保存失敗:', response);
                }
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };

    const isValueOutOfBounds = testValue !== '' && (parseFloat(testValue) < standardValue?.lowerLimit || parseFloat(testValue) > standardValue?.upperLimit);

    // 日期格式化函數
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <div className={styles.outerBox}>
            <div className={styles.container}>
                <h1 className={styles.title}>實驗室品管檢測系統</h1>
                {department && <p>登入部門: {department}</p>}

                <div className={styles.flexContainer}>
                    <div className={styles.leftContainer}>
                        <DocumentSelector 
                            documents={documents} 
                            selectedDocument={selectedDocument} 
                            handleDocumentChange={handleDocumentChange}
                            formatDate={formatDate} 
                        />
                        <CategorySelector 
                            categories={categories} 
                            selectedCategory={selectedCategory} 
                            handleCategoryChange={handleCategoryChange} 
                        />
                    </div>

                    <div className={styles.rightContainer}>
                        <ItemList 
                            items={items} 
                            selectedItem={selectedItem} 
                            handleItemSelect={handleItemSelect} 
                        />
                    </div>
                </div>

                <StandardValueDisplay standardValue={standardValue} />
                <TestValueInput testValue={testValue} handleTestValueChange={handleTestValueChange} />

                {/* 錯誤訊息提示 */}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                {/* 成功訊息提示 */}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

                {/* 儲存按鈕 */}
                <div className={styles.saveButtonContainer}>
                    <button onClick={handleSave} className={styles.saveButton}>儲存</button>
                </div>

                {/* 自訂義的確認框 */}
                {showModal && (
                    <ConfirmationModal
                        message="輸入的數據超出標準範圍！是否仍然要保存？"
                        onConfirm={saveData}
                        onCancel={() => setShowModal(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default QCmain;