import React, { useState } from 'react';
import AddGuardModal from './AddGuardModal';
import AddShiftModal from './AddShiftModal';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const GuardsContainer = () => {
  const [isAddGuardOpen, setIsAddGuardOpen] = useState(false);
  const [isShiftsModal, setIsShiftsModal] = useState(false);

  const openAddGuardModal = () => {
    setIsAddGuardOpen(true);
  };

  const closeAddGuardModal = () => {
    setIsAddGuardOpen(false);
  };

  const openAddShiftsModal = () => {
    setIsShiftsModal(true);
  };

  const closeAddShiftsModal = () => {
    setIsShiftsModal(false);
  };

  return (
    <>
      <Title level={2}>Guard List</Title>
      <Button type="primary" onClick={openAddGuardModal}>
        Add Guards
      </Button>
      <Button type="primary" onClick={openAddShiftsModal}>
        Add Shifts
      </Button>
      {isAddGuardOpen && (<AddGuardModal onClose={closeAddGuardModal} />)}
      {isShiftsModal && (<AddShiftModal onClose={closeAddShiftsModal} />)}
    </>
  );
};

export default GuardsContainer;
