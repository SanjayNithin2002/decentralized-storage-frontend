import React, { useState } from 'react';
import { MDBBtn, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function Popover(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userType = localStorage.getItem('userType');
  const navigate = useNavigate();
  const handleLogout = () => {
    setSpinner(true);
    setTimeout(() => {
      try {
        localStorage.clear();
      } catch (err) {
        console.log(err);
      } finally {
        navigate('/login');
      }

    }, 3000);
  }

  return (
    <MDBPopover poperStyle={{ height: 270, width: 300 }} color='secondary' size='lg' btnChildren={<MDBIcon icon="user" size="lg" />} placement='bottom' open={isOpen} onClick={e => setIsOpen(!isOpen)} toggle={() => setIsOpen(!isOpen)}>
      <MDBPopoverHeader className="text-center">Profile</MDBPopoverHeader>
      <MDBPopoverBody className="text-center">
        <MDBIcon color='primary' icon="user-circle" className="mb-3" size="5x" />
        <div className="d-flex flex-column px-3">
          <div style={{ fontSize: '1.05rem' }}>{user.name}</div>
          <div style={{ fontSize: '1.05rem' }}>{userType === 'dataowners' ? 'Data Owner' : user.role}, {user.department}</div>
        </div>


        <MDBBtn outline className="me-2 mt-3" color="secondary" onClick={e => setIsOpen(!isOpen)}>Close</MDBBtn>
        <MDBBtn color="danger" onClick={handleLogout}>{spinner && <MDBSpinner size='sm' role='status' tag='span' />}<span className='px-2'>Logout</span></MDBBtn>
        <div className='px-5' />
      </MDBPopoverBody>
    </MDBPopover>
  );
}
