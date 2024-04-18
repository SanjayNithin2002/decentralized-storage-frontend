import React, { useState } from 'react';
import { MDBBtn, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Popover = () => {
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
    <MDBPopover poperStyle={{ height: 270, width: 300 }} color='link' size='lg' btnChildren={<MDBIcon icon="user" size="lg" />} placement='bottom' open={isOpen} onClick={e => setIsOpen(!isOpen)} toggle={() => setIsOpen(!isOpen)}>
      <MDBPopoverHeader className="text-center">Profile</MDBPopoverHeader>
      <MDBPopoverBody className="text-center">
        <MDBIcon color='primary' icon="user-circle" className="mb-3" size="5x" />
        <div className="d-flex flex-column px-3">
          <p className='fw-normal fs-6 mb-0'>{user.name}</p>
          <p className='text-muted fs-6 mb-0'>{userType === 'dataowners' ? 'Data Owner' : user.role.split('_').join(' ')}, {user.department}</p>
        </div>


        <MDBBtn outline className="me-2 mt-3" color="secondary" onClick={e => setIsOpen(!isOpen)}>Close</MDBBtn>
        <MDBBtn color="danger" onClick={handleLogout}>{spinner && <MDBSpinner size='sm' role='status' tag='span' />}<span className='px-2'>Logout</span></MDBBtn>
        <div className='px-5' />
      </MDBPopoverBody>
    </MDBPopover>
  );
}

export default Popover;