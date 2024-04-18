import React from 'react';
import { MDBContainer, MDBCol, MDBIcon } from 'mdb-react-ui-kit'; // Import necessary MDBootstrap components
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <MDBContainer className="mb-4 mt-5 d-flex justify-content-center"> {/* Added class 'd-flex justify-content-center' to center content */}
        <MDBCol col="24" md="7" className="text-center text-md-start d-flex flex-column justify-content-center">
          <h1 className="text-center my-5 display-3 fw-bold ls-tight">
            404<br />
            <span className="text-primary">Oops! Page not found.</span>
          </h1>

            <p className='text-center' style={{ color: 'hsl(217, 10%, 50.8%)', fontSize: '1.25rem' }}>
              The page you are looking for might have been removed, had its name changed, is temporarily unavailable or doesn't exist.
            </p>
            <p className='text-center mt-3'>
              <MDBIcon icon="exclamation-triangle" className="mr-2 px-1" /> Please check the URL again or go back to the <span className="pointer text-primary" onClick={redirectToHome}>Home</span>.
            </p>
        </MDBCol>
    </MDBContainer>
  );
}

export default NotFound;

