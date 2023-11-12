import React from 'react';
import { Table, Divider } from 'antd';

const ScheduleTable = ({ scheduleTable }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];

  return (
    <>
        <Divider />
        <Table dataSource={scheduleTable} columns={columns} scroll={{ y: 200 }} />
    </>       
  );
  
};

export default ScheduleTable;