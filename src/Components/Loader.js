import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

const Loader = () => {
  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <MDBSpinner grow>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    </div>
  );
}

export default Loader;
