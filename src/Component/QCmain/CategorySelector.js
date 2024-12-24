import React from 'react';
import styles from './QCmain.module.css';

const CategorySelector = ({ categories, selectedCategory, handleCategoryChange }) => (
    <div className={styles.inputGroup}>
        <label className={styles.label}>選擇分類:</label>
        <select value={selectedCategory} onChange={handleCategoryChange} className={styles.input}>
            <option value="">請選擇分類</option>
            {categories.map((category) => (
                <option key={category.categoryID} value={category.categoryID}>
                    {category.categoryName}
                </option>
            ))}
        </select>
    </div>
);

export default CategorySelector;
