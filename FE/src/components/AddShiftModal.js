import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { sendSuccessMessage, sendErrorMessage } from './helpers/notifications';
import { beServices } from '../api-calls/BeService';
import ShiftsTable from './ShiftsTable'

const AddShiftModal = ({ onClose }) => {
  const [shifts, setShifts] = useState([]);
  const [newShiftHours, setNewShiftHours] = useState('');
  const [newShiftPower, setNewShiftPower] = useState('');
  const [shiftStation, setShiftStation] = useState('');

  const numberToStringDigits = (number) => number < 10 ? `0${number}` : `${number}`;

  const validateNumberEarthierFullOrHalf = (number) => {
    const convertedFloatNumber = parseFloat(number, 1);
    const convertedIntNumber = parseInt(number);

    console.log('conv', { convertedFloatNumber, convertedIntNumber })
    return convertedIntNumber === convertedFloatNumber || convertedFloatNumber === convertedIntNumber + 0.5
  };

  const validateShiftInput = () => {
    if (shiftStation === '') {
      sendErrorMessage('Error- Empty shift station.', 'Please enter a shift station.');
      return false;
    }
    if (newShiftHours === '' || newShiftPower === '') {
      sendErrorMessage('Error- Empty fields.', 'Please enter shift hours and shift power.');
      return false;
    }

    if (!validateNumberEarthierFullOrHalf(newShiftHours)){
      sendErrorMessage('Error- Invalid shift hours.', 'Shift hours must be full or half.');      
      return false;
    }

    if(!validateNumberEarthierFullOrHalf(newShiftPower)){
      sendErrorMessage('Error- Invalid shift power.', 'Shift power must be full or half.');      
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

  const addShift = () => {
    const isValid = validateShiftInput();

    if (isValid) {      
      setShifts([...shifts, { shiftStation, shiftText:`${numberToStringDigits(10)}:00`, shiftHours: parseFloat(newShiftHours, 2), shiftPower: parseFloat(newShiftPower, 2), key: shifts.length }]);
      setNewShiftHours('');
      setNewShiftPower('');
      setShiftStation('');
      sendSuccessMessage('Success- Shift added to the list.');      
    }
  };

  const removeShift = (index) => {
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShifts(updatedShifts);
  };

  const saveShiftToDb = async () => {
    try{
      const shiftsToSave = shifts.map(({ shiftHours, shiftPower, shiftStation, shiftText }) => ({ shiftHours, shiftPower, shiftStation, shiftText }));
       await beServices.addShifts(shiftsToSave);
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
        value={shiftStation}
        onChange={(e) => setShiftStation(e.target.value)}
        placeholder="Enter shifts station"
      />
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
