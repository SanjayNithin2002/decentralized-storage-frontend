import React from "react";
import {
    MDBCol,
    MDBRow,
    MDBIcon
} from 'mdb-react-ui-kit';

const InfoPane = () => {
    return (
        <MDBCol col='18' md='7' className='p-5 text-center text-md-start d-flex flex-column justify-content-center px-auto py-auto'>
            <div className="d-flex align-items-center mb-2">
                <MDBIcon fab icon="dashcube" size="8x" className="me-2 text-primary" />
                <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                <span className="text-primary">Decentralized Storage</span> <br />
                    <span>for your organization</span>
                </h1>
            </div>

            <MDBRow className='px-3 col-md-14'>
                <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.35rem' }}>
                    Traditional cloud storage can feel like a leaky bucket for your sensitive departmental files.
                    Decentralized Storage offers a more secure solution.  Imagine your data scattered across a
                    network of secure vaults, each one encrypted with military-grade protection.
                    Granular access controls with <span className="text-primary"> Role-based encryption </span>ensure only authorized personnel can access specific files within your department.
                    <span className="text-primary"> Blockchain technology </span> acts as a digital guardian, keeping a tamper-proof record of all changes.
                    Decentralized Storage empowers you to share files securely, streamline collaboration, and finally take control
                    of your department's digital destiny.
                </p>
            </MDBRow>
        </MDBCol>
    )
}

export default InfoPane;
