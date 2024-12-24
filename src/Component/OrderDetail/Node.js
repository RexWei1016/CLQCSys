import React from 'react';
import './Node.css'; // 引入CSS文件

function Node({ title, items, status01 }) {
    return (
        <div className={`node ${status01}`}>
            <h2 className='node-title'>{title}</h2>
            <ul className='node-content'>
                {items.map(({ text, text2, status, date }, index) => (
                    <React.Fragment key={index}>
                        <li className={status}>
                            <div className="row">
                                <div className="col-8">{text}</div> {/* 讓 text 佔據 8 格 */}
                                <div className="col-4 text-end">{date}</div> {/* 讓 date 佔據 4 格，並靠右對齊 */}
                            </div>
                            <div className="row">
                                <div className="col-12">{text2}</div> {/* 下一行顯示 text2 */}
                            </div>
                        </li>
                        {index < items.length - 1 && <hr className="separator-line" />}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default Node;
