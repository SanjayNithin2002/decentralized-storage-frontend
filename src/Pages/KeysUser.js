import React, { useState } from "react";
import { MDBContainer, MDBBtn, MDBSpinner, MDBCol, MDBRow, MDBIcon } from "mdb-react-ui-kit";
import { getKeys } from "../API/Actions";
import Modal from "../Components/Modal";

const KeysUser = () => {
    const [modalContent, setModalContent] = useState(null);
    const [getSpinner, setGetSpinner] = useState(false);

    const handleGetKeys = async () => {
        try {
            setGetSpinner(true);
            const response = await getKeys();
            console.log(response);
            if (response instanceof Blob) {
                const url = URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'secret.key';
                link.click();
            } else {
                throw new Error(response.message || response.error || 'Unable to fetch');
            }
        } catch (err) {
            setModalContent(err.message);
        }
        finally {
            setGetSpinner(null)
            setTimeout(() => setModalContent(null), 3000);
        }
    }

    return (
        <MDBContainer className='mb-4'>
            <MDBRow className="align-items-start">
                <MDBCol col='18' md='7' className='text-center text-md-start d-flex flex-column justify-content-center mt-0'>
                    <div className="d-flex align-items-center mb-2">
                        <MDBIcon fab icon="dashcube" size="4x" className="me-0 text-primary" />
                        <h1 className="my-5 display-6 fw-normal ls-tight px-3">
                            <span className="text-primary">What to do with the keys </span>
                            <span>as a User?</span>
                        </h1>
                    </div>

                    <MDBRow className='px-3 col-md-11'>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary"> i) Secure Keys: </span>
                            Your access to files is controlled by a secure key system.
                            This ensures only authorized users can view specific data.</p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary"> ii) Permission Required: </span>
                            To access a file, you must have the necessary permission.
                            These permissions are stored securely on a blockchain ledger, guaranteeing their tamper-proof nature.
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary"> iii) Key Possession: </span>
                            Even if you have permission to access a file, you'll also need the correct decryption key.
                            Uploading the wrong key or not having the designated key will prevent you from viewing the file.
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary">iv) Two-Factor Security: </span>
                            This two-factor system (permission and key) ensures the highest level of security for your files.
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary">v) Regarding Issues: </span>
                            If you are unable to download the keys, contact your Department Data Owner. They will be able to assist you further.
                        </p>
                    </MDBRow>
                </MDBCol>
                <MDBCol col='6' md='4' className="text-center text-md-end mx-auto my-auto px-auto pt-auto">
                    <div className='square border rounded-7 shadow-4 mb-4'>
                        <div className='px-3 mt-4'>
                            <h3 className="text-center text-primary mb-4">Key Handlers</h3>
                            <MDBBtn
                                id='generate-btn'
                                onClick={handleGetKeys}
                                className='w-100 mb-5'
                            >
                                {getSpinner && <MDBSpinner size='sm' role='status' tag='span' />}
                                <span className='px-2'>Get Keys</span>
                            </MDBBtn>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow >
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer>
    )
}

export default KeysUser;