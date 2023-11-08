import React, { useState } from 'react';
import { Modal, Input, Button, Table,notification, Divider } from 'antd';
import { saveAs } from 'file-saver';

const AddGuardModal = ({ onClose }) => {
  const [guards, setGuards] = useState([]);
  const [newGuard, setNewGuard] = useState('');

  const addGuard = () => {
    const guardsLowerCase = guards.map((guard) => guard.toLowerCase());

    if(newGuard === ''){
      notification['error']({ placement:'bottomLeft', message:'Error- Empty guard name.', description:'Please enter a guard name.', duration: 4.5 });
    }else if (guardsLowerCase.includes(newGuard.toLocaleLowerCase())) {
      notification['error']({ placement:'bottomLeft', message:'Error- Duplicate guard name.', description:'Guard name already exists.', duration: 4.5 });
    }else {
      setGuards([...guards, newGuard]);
      setNewGuard('');
      notification['success']({ placement:'bottomLeft', message:'Success- Added to guard list.', description:'Guard was added to list.', duration: 4.5 });
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

            notification['success']({
              placement: 'bottomLeft',
              message: 'Success- Guards added from file.',
              description: 'Guards were added to list from the uploaded file.',
              duration: 4.5,
            });
          } else {
            notification['error']({
              placement: 'bottomLeft',
              message: 'Error- Invalid file format.',
              description: 'Please upload a valid JSON file containing an array of strings.',
              duration: 4.5,
            });
          }
        } catch (error) {
          notification['error']({
            placement: 'bottomLeft',
            message: error.message,
            description: 'Please upload a valid JSON file.',
            duration: 4.5,
          });
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