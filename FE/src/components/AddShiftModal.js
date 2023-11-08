import React, { useState } from 'react';
import { Modal, Input, Button, Table, notification, Divider } from 'antd';
import { saveAs } from 'file-saver';

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
      notification['success']({
        placement: 'bottomLeft',
        message: 'Success- Shift added to the list.',
        duration: 4.5,
      });
    }
  };

  const validateShiftInput = () => {
    if (newShiftHours === '' || newShiftPower === '') {
      notification['error']({
        placement: 'bottomLeft',
        message: 'Error- Empty fields.',
        description: 'Please enter shift hours and shift power.',
        duration: 4.5,
      });
      return false;
    }
    const hours = parseInt(newShiftHours);
    const power = parseInt(newShiftPower);

    if (hours < 1 || hours > 24) {
      notification['error']({
        placement: 'bottomLeft',
        message: 'Error- Invalid shift hours.',
        description: 'Shift hours must be between 1 and 24.',
        duration: 4.5,
      });
      return false;
    }

    if (power < 0 || power > 100) {
      notification['error']({
        placement: 'bottomLeft',
        message: 'Error- Invalid shift power.',
        description: 'Shift power must be between 0 and 100.',
        duration: 4.5,
      });
      return false;
    }

    return true;
  };

  const removeShift = (index) => {
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShifts(updatedShifts);
  };

  const columns = [
    {
      title: 'Shift Hours',
      dataIndex: 'shiftHours',
      key: 'shiftHours',
    },
    {
      title: 'Shift Power',
      dataIndex: 'shiftPower',
      key: 'shiftPower',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <Button type="danger" onClick={() => removeShift(index)}>
          Remove
        </Button>
      ),
    },
  ];

  const dataSource = shifts.map((shift, index) => ({ key: index, shiftHours: shift.shiftHours, shiftPower: shift.shiftPower }));

  const saveToFile = () => {
    const data = JSON.stringify(shifts);
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, 'shifts.json');
  };

  return (
    <Modal
      title="Shift List"
      visible
      onCancel={onClose}
      footer={[
        <Button key="addShift" type="primary" onClick={addShift}>
          Add Shift
        </Button>,
        <Button key="save" onClick={saveToFile}>
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
      {dataSource.length ? (
        <>
          <Divider />
          <Table dataSource={dataSource} columns={columns} />
        </>
      ) : null}
    </Modal>
  );
};

export default AddShiftModal;
