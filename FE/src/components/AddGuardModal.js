import React, { useState } from 'react';
import { Modal, Input, Button, Table, Divider } from 'antd';
import { sendSuccessMessage, sendErrorMessage } from './helpers/notifications';
import { saveAs } from 'file-saver';

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

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    console.log('selectedFile',{ selectedFile });

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const guardsFromFile = JSON.parse(e.target.result);

          console.log('guardsFromFile',{ guardsFromFile });

          if (Array.isArray(guardsFromFile) && guardsFromFile.every((guard) => typeof guard === 'string')) {
            const duplicateHelper = new Set([...guardsFromFile, ...guards]);
            console.log('duplicateHelper',{ duplicateHelper: [...duplicateHelper] });
            setGuards([...duplicateHelper].filter((guard) => guard !== ''));

            sendSuccessMessage('Success- Guards added from file.');            
          } else {
            sendErrorMessage('Error- Invalid file format.', 'Please upload a valid JSON file containing an array of strings.');            
          }
        } catch (error) {
          sendErrorMessage('Error- Invalid file format.', 'Please upload a valid JSON file.');          
        }
      };

      reader.readAsText(selectedFile);
    }
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

  const saveToFile = () => {
    const data = JSON.stringify(guards);
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, 'guards.json');
  };

  return (
    <Modal
      title="Guard List"
      open 
      onCancel={onClose}
      footer={[
        <Button key="addGuard" type="primary" onClick={addGuard}>
          Add Guard
        </Button>,
        <Button key="upload" onClick={() => document.getElementById('fileInput').click()}>
          Upload File
        </Button>,
        <Button key="save" onClick={saveToFile}>
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
        <input
          id="fileInput"
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </>
      ) : (<></>)}
      
    </Modal>
  );
};

export default AddGuardModal;