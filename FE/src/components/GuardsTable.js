import React from 'react';
import { Button, Table, Divider } from 'antd';

const GuardTable = ({ removeGuard, unActiveGuard, guards }) => {
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
  
  if(guards.length) {
    if(guards[0].guardScore) {
      columns.push({
        title: 'Guard Score',
        dataIndex: 'guardScore',
        key: 'guardScore',
      });
    }
  }

  if(removeGuard){
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <Button type="danger" onClick={() => removeGuard(index)}>
          Remove
        </Button>
      ),
    });  
  }

  if(unActiveGuard){
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="danger" onClick={() => unActiveGuard(record)}>
          Deactivate Guard
        </Button>
      ),
    });  
  }

  return (
    <>
        <Divider />
        <Table dataSource={guards} columns={columns} scroll={{ y: 200 }} />
    </>       
  );
  
};

export default GuardTable;