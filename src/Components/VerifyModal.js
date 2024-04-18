import React, { useEffect, useRef, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit';

const VerifyModal = (props) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <MDBModal open={open} setOpen={setOpen} tabIndex={-1}>
        <MDBModalDialog centered>
          <MDBModalContent className="d-flex flex-column justify-content-center align-items-center">
            <MDBModalHeader>
              <strong>{props.title}</strong>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="text-start">
                <p><strong>Calculated Merkle Root:</strong></p>
                <p style={{ fontSize: '0.85em' }}>{props.body.calculatedMerkleRoot}</p>
                <p><strong>Stored Merkle Root:</strong></p>
                <p style={{ fontSize: '0.85em' }}>{props.body.storedMerkleRoot}</p>
                <p><strong>Integrity Preserved: </strong>{props.body.integrityPreserved ? "True" : "False"}</p>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='danger' type='button' onClick={() => {
                setOpen(!open);
                props.handleStateChange();
              }}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default VerifyModal;
