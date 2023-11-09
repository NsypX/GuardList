import React from 'react';
import { Button, Table, Divider } from 'antd';

const GuardTable = ({ removeGuard, guards }) => {

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
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <Button type="danger" onClick={() => removeGuard(index)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <>
        <Divider />
        <Table dataSource={guards} columns={columns} />
    </>       
  );
};

export default GuardTable;