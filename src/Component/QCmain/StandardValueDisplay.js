import React from 'react';
import styles from './QCmain.module.css';

const StandardValueDisplay = ({ standardValue }) => (
    standardValue ? (
        <div className={styles.standardValue}>
            <p>標準值 - 下限: {standardValue.lowerLimit}, 上限: {standardValue.upperLimit}</p>
        </div>
    ) : null
);

export default StandardValueDisplay;
