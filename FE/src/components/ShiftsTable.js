import React from 'react';
import { Button, Table, Divider } from 'antd';

const ShiftsTable = ({ removeShift, unActiveShift, shifts }) => {
  const columns = [
    {
      title: 'Shift Station',
      dataIndex: 'shiftStation',
      key: 'shiftStation',
    },
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
        <Button disabled={index !== shifts.length - 1} type="danger" onClick={() => removeShift(record, index)}>
          Remove
        </Button>
      ),
    });  
  }

  if(unActiveShift){
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="danger" onClick={() => unActiveShift(record)}>
          Deactivate Shift
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