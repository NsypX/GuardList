import React from 'react';
import { Button, Table, Divider } from 'antd';

const ShiftsTable = ({ removeShift, shifts }) => {
  const columns = [
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

  const dataSource = shifts.map((shift, index) => ({ key: index, shiftHours: shift.shiftHours, shiftPower: shift.shiftPower }));

  if(removeShift){
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <Button type="danger" onClick={() => removeShift(index)}>
          Remove
        </Button>
      ),
    });  
  }

  return (
    <>
        <Divider />
        <Table dataSource={dataSource} columns={columns} scroll={{ y: 200 }} />
    </>       
  );
};

export default ShiftsTable;