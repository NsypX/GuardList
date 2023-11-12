import React from 'react';
import { Button, Table, Divider } from 'antd';

const ShiftsTable = ({ removeShift, shifts = [] }) => {  
  const columns = [   
    {
      title: 'Duration',
      dataIndex: 'shiftText',
      key: 'shiftText',
    },
    {
      title: 'Shift Hours',
      dataIndex: 'shiftHours',
      key: 'shiftHours',
    },
    {
      title: 'Shift Power',
      dataIndex: 'shiftPower',
      key: 'shiftPower',
    },    
  ];

  if(removeShift){
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <Button key={index} disabled={index !== shifts.length - 1} type="danger" onClick={() => removeShift(record, index)}>
          Remove
        </Button>
      ),
    });  
  }
  
  return (
    <>
        <Divider />
        <Table dataSource={shifts} columns={columns} scroll={{ y: 150 }} />
    </>       
  );
};

export default ShiftsTable;