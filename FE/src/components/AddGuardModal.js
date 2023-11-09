import React, { useState } from 'react';
import { Modal, Input, Button, Table, Divider } from 'antd';
import { sendSuccessMessage, sendErrorMessage } from './helpers/notifications';
import { beServices } from '../api-calls/BeService';

const AddGuardModal = ({ onClose }) => {
  const [guards, setGuards] = useState([]);
  const [newGuard, setNewGuard] = useState('');

  const addGuard = () => {
    const guardsLowerCase = guards.map((guard) => guard.toLowerCase());

    if(newGuard === ''){
      sendErrorMessage('Error- Empty guard name.', 'Please enter a guard name.');      
    }else if (guardsLowerCase.includes(newGuard.toLocaleLowerCase())) {
      sendErrorMessage('Error- Duplicate guard name.', 'Guard name already exists.');      
    }else {
      setGuards([...guards, newGuard]);
      setNewGuard('');
      sendSuccessMessage('Success- Guard added to the list.');      
    }
  };

  const removeGuard = (index) => {
    const updatedGuards = [...guards];
    updatedGuards.splice(index, 1);
    setGuards(updatedGuards);
  };

  const columns = [
    {
      title: 'Guard Name',
      dataIndex: 'name',
      key: 'name',
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

  const dataSource = guards.map((guard, index) => ({ key: index, name: guard }));

  const saveGuardsInDb = async () => {
    await beServices.addGuards(guards);
  }

  return (
    <Modal
      title="Guard List"
      open 
      onCancel={onClose}
      footer={[
        <Button key="addGuard" type="primary" onClick={addGuard}>
          Add Guard
        </Button>,
        <Button key="save" onClick={saveGuardsInDb}>
          Save
        </Button>,
      ]}
    >
      <Input
        value={newGuard}
        onChange={(e) => setNewGuard(e.target.value)}
        placeholder="Enter guard name"
      />
      {dataSource.length ? (
      <>
        <Divider />
        <Table dataSource={dataSource} columns={columns} />
      </>
      ) : (<></>)}
      
    </Modal>
  );
};

export default AddGuardModal;