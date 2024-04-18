import React from "react";
import { MDBContainer, MDBIcon, MDBCol } from "mdb-react-ui-kit";

const KeysUser = () => {
    return (
        <MDBContainer className='mb-4'>
            <MDBCol className='text-center text-md-start d-flex flex-column justify-content-center mt-0'>
                <div className="d-flex align-items-center mb-2">
                    <MDBIcon fab icon="dashcube" size="8x" className="me-0 text-primary" />
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        <span className="text-primary">Decentralized Storage <br /></span>
                        <span>for your organization</span>
                    </h1>
                </div>

                <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.5rem', marginLeft: 'auto', marginRight: '10px' }}>
                    This project proposes a novel architecture for secure and scalable cloud storage leveraging blockchain technology for
                    enhanced data integrity verification. The system utilizes a hybrid approach, storing file metadata on the Ethereum
                    blockchain for tamper-proof record-keeping, while the actual data resides in a secure cloud storage solution like Google Firebase Storage.
                    The project draws inspiration from existing research and implements best practices for secure cloud storage.
                    It surpasses traditional database storage by offering decentralized security, transparency, and immutability through blockchain technology.
                    This solution is particularly suitable for organizations handling sensitive data and requiring robust access control and
                    tamper-proof verification mechanisms.
                </p>
            </MDBCol>
        </MDBContainer>
    );
};

export default KeysUser;
