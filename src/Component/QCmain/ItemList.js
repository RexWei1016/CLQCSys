import React from 'react';
import styles from './QCmain.module.css';

const ItemList = ({ items, selectedItem, handleItemSelect }) => (
    <div>
        <label className={styles.label}>選擇項目:</label>
        <ul className={styles.listbox}>
            {items.map((item) => (
                <li
                    key={item.itemID}
                    className={`${styles.listItem} ${selectedItem?.itemID === item.itemID ? styles.selected : ''}`}
                    onClick={() => handleItemSelect(item)}
                >
                    {item.itemName} - {item.checkLevel}
                </li>
            ))}
        </ul>
    </div>
);

export default ItemList;
