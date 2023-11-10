import React, { useState } from 'react';
import { Modal, Input, Button, Divider } from 'antd';
import { sendSuccessMessage, sendErrorMessage } from './helpers/notifications';
import { beServices } from '../api-calls/BeService';
import ShiftsTable from './ShiftsTable'

const AddShiftModal = ({ onClose }) => {
  const [shifts, setShifts] = useState([]);  
  const [newShiftHours, setNewShiftHours] = useState('');
  const [newShiftPower, setNewShiftPower] = useState('');
  const [shiftStation, setShiftStation] = useState('');
  const [shiftStartTime, setShiftStartTime] = useState('');

  const validateFullNumber = (number) => {
    const convertedFloatNumber = parseFloat(number, 1);
    const convertedIntNumber = parseInt(number);

    return convertedIntNumber === convertedFloatNumber
  };

  const validateHalfNumber = (number) => {
    const convertedFloatNumber = parseFloat(number, 1);
    const convertedIntNumber = parseInt(number);

    return convertedFloatNumber === convertedIntNumber + 0.5
  };

  const numberToStringDigits = (number) => number < 10 ? `0${number}` : `${number}`;

  const timeToStringDigits = (number) => {
    const isHalf = validateHalfNumber(number);

    if (isHalf) {
      return `${numberToStringDigits(number - 0.5)}:30`;
    }

    return `${numberToStringDigits(number)}:00`;
  }

  const getTimeDifference = (startTime, hoursToAdd) => {
    const floatStart = parseFloat(startTime, 1);
    const floatHoursToAdd = parseFloat(hoursToAdd, 1);

    return `${timeToStringDigits(floatStart)}-${timeToStringDigits(floatStart + floatHoursToAdd)}`
  }

  const validateNumberEarthierFullOrHalf = (number) => {        
    return validateFullNumber(number) || validateHalfNumber(number);
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

  const generateShiftText = (shiftStartTimeFunc, shiftHoursFunc) => getTimeDifference(shiftStartTimeFunc, shiftHoursFunc);

  const addShift = () => {
    const isValid = validateShiftInput();

    if (isValid) {      
      setShifts([...shifts, { shiftStation, shiftText:`${generateShiftText(shiftStartTime, newShiftHours)}`, shiftHours: parseFloat(newShiftHours, 2), shiftPower: parseFloat(newShiftPower, 2), key: shifts.length }]);
      setShiftStartTime(parseFloat(shiftStartTime, 2) + parseFloat(newShiftHours, 2));
      setNewShiftHours('');
      setNewShiftPower('');

      sendSuccessMessage('Success- Shift added to the list.');      
    }
  };

  const removeShift = (record, index) => {
    const { shiftHours } = record;
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShiftStartTime(parseFloat(shiftStartTime, 2) - parseFloat(shiftHours, 2));
    setShifts(updatedShifts);
  };

  const getShiftsHoursDistanceFrom24 = (shifts) => {
    const totalShiftsTime = shifts.reduce((total, { shiftHours }) => total + shiftHours, 0);
    if(totalShiftsTime !== 24){
      return 24 - totalShiftsTime;
    }

    return 0;
  };

  const saveShiftToDb = async () => {
    try {
      const shiftsToSave = shifts.map(({ shiftHours, shiftPower, shiftStation, shiftText }) => ({ shiftHours, shiftPower, shiftStation, shiftText }));
      const distance = getShiftsHoursDistanceFrom24(shiftsToSave);

      if (distance > 0) {
        sendErrorMessage(`Shifts total time must be 24 hours. distance- ${distance}`);
        return;
      }

      await beServices.addShifts(shiftsToSave);
      sendSuccessMessage('Success- Shifts saved in DB.');
    } catch(error) {
      sendErrorMessage('Error- Failed to save Shifts in DB.', error.message);
    }

    onClose();
  }

  const handleCloseModal = () => {
    setNewShiftHours('');
    setNewShiftPower('');
    setShiftStation('');
    setShifts([]);
    onClose()
  }

  return (
    <Modal
      title="Shift List"
      open
      onCancel={handleCloseModal}
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
        disabled={(shifts.length)}
        onChange={(e) => setShiftStation(e.target.value)}
        placeholder="Enter shifts station"
      />
       <Input
        value={shiftStartTime}
        disabled={(shifts.length)}
        onChange={(e) => setShiftStartTime(e.target.value)}
        placeholder="Enter start hour (0-24)"
        type="number"
        min={0}
        max={24}
      />

      <Divider/>

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
