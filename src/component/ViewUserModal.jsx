import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import { Spinner } from 'reactstrap';

const ViewUserModal = ({ isOpen, toggle, user }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle} className="bg-primary text-white">
        View User
      </ModalHeader>
      <ModalBody>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </>
        ) : (
          <div className="text-center">
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
            <p>Loading...</p>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewUserModal;
