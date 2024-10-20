import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from 'axios';

const DeleteUserModal = ({ isOpen, toggle, userId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteUser/${userId}`);
      onDelete(); 
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete User</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this user?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDelete}>Delete</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteUserModal;
