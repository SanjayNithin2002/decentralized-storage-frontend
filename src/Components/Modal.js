import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody
} from 'mdb-react-ui-kit';

export default function Modal(props) {
  const [topRightModal, setTopRightModal] = useState(true);

  const toggleOpen = () => setTopRightModal(!topRightModal);

  return (
    <MDBModal
      animationDirection='right'
      open={topRightModal}
      tabIndex='-1'
      setOpen={setTopRightModal}
    >
      <MDBModalDialog className="bottom-right-modal" size="sm">
        <MDBModalContent>
          <MDBModalBody className='bg-primary text-white'>
            {props.title}
            <MDBBtn
              color='none'
              className='btn-close btn-close-white px-2'
              onClick={toggleOpen}
            ></MDBBtn>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}