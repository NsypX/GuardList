import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { sendSuccessMessage, sendErrorMessage } from './helpers/notifications';
import { beServices } from '../api-calls/BeService';
import GuardTable from './GuardsTable'

const AddGuardModal = ({ onClose }) => {
  const [guards, setGuards] = useState([]);
  const [newGuard, setNewGuard] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const addGuard = () => {
    const guardsLowerCase = guards.map((guard) => guard.name.toLowerCase());

    if(newGuard === ''){
      return sendErrorMessage('Error- Empty guard name.', 'Please enter a guard name.');            
    }else if (guardsLowerCase.includes(newGuard.toLocaleLowerCase())) {
      return sendErrorMessage('Error- Duplicate guard name.', 'Guard name already exists.');      
    }else {
      
    }

    setGuards([...guards, { name: newGuard, phoneNumber: newPhoneNumber, key: guards.length }]);
    setNewGuard('');
    setNewPhoneNumber('');
    
    return sendSuccessMessage('Success- Guard added to the list.');      
  };

  const removeGuard = (index) => {
    const updatedGuards = [...guards];
    updatedGuards.splice(index, 1);
    setGuards(updatedGuards);
  };
  
  const saveGuardsInDb = async () => {
    try{
      const guardsToSend = guards.map((guard) => ({ name:guard.name, phoneNumber:guard.phoneNumber }));
       await beServices.addGuards(guardsToSend);
      sendSuccessMessage('Success- Guards saved in DB.');
    }catch(error){
      sendErrorMessage('Error- Failed to save guards in DB.', error.message);
    }
    onClose();
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
        <Button disabled={!guards.length} key="save" onClick={saveGuardsInDb} >
          Save
        </Button>,
      ]}
    >
      <Input
        value={newGuard}
        onChange={(e) => setNewGuard(e.target.value)}
        placeholder="Enter guard name"
      />
      <Input
        value={newPhoneNumber}
        onChange={(e) => setNewPhoneNumber(e.target.value)}
        placeholder="Enter guard phone number"
        ></Input>     
     <GuardTable removeGuard={removeGuard} guards={guards} />      
    </Modal>
  );
};

export default AddGuardModal;