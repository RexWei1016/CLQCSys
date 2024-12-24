import React from 'react';
import Node from './Node';
import './HorizontalStepper.css';

function HorizontalStepper({ nodesData, dateItems }) {
  return (
    <div className="row custom-row">
      <div className="col-md-6"> {/* 使用 Bootstrap 網格系統 */}
        {nodesData.map((nodeData, index) => (
          <Node
            key={index}
            title={nodeData.title}
            items={nodeData.items}
            status01={nodeData.status01}
            date={nodeData.date}
          />
        ))}
      </div>
      <div className="col-md-6">
        <div className='date-container'>
       
          <h3>工作日誌</h3>
          <table className="table">
            <tbody>
              {dateItems.map((dateItem, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left', width: '40%', whiteSpace: 'nowrap' }}>
                    {dateItem.eventDate}
                  </td> {/* 日期靠左對齊，並不換行 */}
                  <td style={{ textAlign: 'left', width: '60%' }}>{dateItem.description}</td> {/* 說明靠左對齊 */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HorizontalStepper;
