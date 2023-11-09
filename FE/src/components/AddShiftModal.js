import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { sendSuccessMessage, sendErrorMessage } from './helpers/notifications';
import { beServices } from '../api-calls/BeService';
import ShiftsTable from './ShiftsTable'

const AddShiftModal = ({ onClose }) => {
  const [shifts, setShifts] = useState([]);
  const [newShiftHours, setNewShiftHours] = useState('');
  const [newShiftPower, setNewShiftPower] = useState('');

  const addShift = () => {
    const isValid = validateShiftInput();
    if (isValid) {
      const newShift = { shiftHours: parseInt(newShiftHours), shiftPower: parseInt(newShiftPower) };
      setShifts([...shifts, newShift]);
      setNewShiftHours('');
      setNewShiftPower('');
      sendSuccessMessage('Success- Shift added to the list.');      
    }
  };

  const validateShiftInput = () => {
    if (newShiftHours === '' || newShiftPower === '') {
      sendErrorMessage('Error- Empty fields.', 'Please enter shift hours and shift power.');
      return false;
    }
    const hours = parseInt(newShiftHours);
    const power = parseInt(newShiftPower);

    if (hours < 1 || hours > 24) {
      sendErrorMessage('Error- Invalid shift hours.', 'Shift hours must be between 1 and 24.');
      return false;
    }

    if (power < 0 || power > 100) {
      sendErrorMessage('Error- Invalid shift power.', 'Shift power must be between 0 and 100.');      
      return false;
    }

    return true;
  };

  const removeShift = (index) => {
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShifts(updatedShifts);
  };

  const saveShiftToDb = async () => {
    try{
      const shiftsToSave = shifts.map(({ shiftHours,shiftPower }) => ({ shiftHours, shiftPower }));
       await beServices.addGuards(shiftsToSave);
      sendSuccessMessage('Success- Shifts saved in DB.');
    }catch(error){
      sendErrorMessage('Error- Failed to save Shifts in DB.', error.message);
    }
    onClose();
  }

  return (
    <Modal
      title="Shift List"
      open
      onCancel={onClose}
      footer={[
        <Button key="addShift" type="primary" onClick={addShift}>
          Add Shift
        </Button>,
        <Button key="save" onClick={saveShiftToDb}>
          Save
        </Button>,
      ]}
    >
      <Input
        value={newShiftHours}
        onChange={(e) => setNewShiftHours(e.target.value)}
        placeholder="Enter shift hours (1-24)"
        type="number"
        min={1}
        max={24}
      />
      <Input
        value={newShiftPower}
        onChange={(e) => setNewShiftPower(e.target.value)}
        placeholder="Enter shift power (0-100)"
        type="number"
        min={0}
        max={100}
      />
     <ShiftsTable removeShift={removeShift} shifts={shifts} />      
    </Modal>
  );
};

export default AddShiftModal;
