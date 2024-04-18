import React, { useState } from "react";
import { MDBContainer, MDBBtn, MDBSpinner, MDBCol, MDBRow, MDBIcon } from "mdb-react-ui-kit";
import { clearKeys, generateKeys } from "../API/Actions";
import Modal from "../Components/Modal";

const KeysDataOwner = () => {
    const [modalContent, setModalContent] = useState(null);
    const [generateSpinner, setGenerateSpinner] = useState(false);
    const [clearSpinner, setClearSpinner] = useState(false);

    const handleGenerateKeys = async () => {
        try {
            setGenerateSpinner(true);
            const response = await generateKeys();
            console.log(response);
            if (response instanceof Blob) {
                const url = URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'secrets';
                link.click();
            } else {
                throw new Error(response.message || response.error || 'Unable to fetch');
            }
        } catch (err) {
            setModalContent(err.message);
        }
        finally {
            setGenerateSpinner(null)
            setTimeout(() => setModalContent(null), 3000);
        }
    }
    const handleClearKeys = async () => {
        try {
            setClearSpinner(true);
            const response = await clearKeys();
            if (response.status === 200) {
                setModalContent(response.message)
            } else {
                throw new Error(response.error || 'Unable to fetch');
            }
        } catch (err) {
            setModalContent(err.message);
        }
        finally {
            setClearSpinner(null)
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
                            <span>as a Data Owner?</span>
                        </h1>
                    </div>

                    <MDBRow className='px-3 col-md-11'>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary"> i) Download Keys: </span>
                            As a data owner, you have the ability to generate encryption keys through the portal.
                            This process will download a compressed file (ZIP) to your local machine.</p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary"> ii) Key Naming Convention: </span>
                            Each key within the ZIP file is named according to its designated role.
                            For example, a key intended for manager access will be named "Manager.key".
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary"> iii) Key Selection: </span>
                            When uploading a file, ensure you select the appropriate key corresponding to the role authorized to access the data.
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary">iv) Key Sharing: </span>
                            Inform all individuals within your department to access the portal and download their designated keys.
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary">v) Time-Sensitive Deletion: </span>
                            To maintain optimal security, it is recommended to clear the keys within a maximum of 24 hours after generation.
                        </p>
                    </MDBRow>
                </MDBCol>
                <MDBCol col='6' md='4' className="text-center text-md-end mx-auto my-auto px-auto pt-auto">
                    <div className='square border rounded-7 shadow-4 mb-4'>
                        <div className='px-3 mt-4'>
                            <h3 className="text-center text-primary mb-4">Key Handlers</h3>
                            <MDBBtn
                                id='generate-btn'
                                onClick={handleGenerateKeys}
                                className="w-100 mb-4"
                            >
                                {generateSpinner && <MDBSpinner size='sm' role='status' tag='span' />}
                                <span className='px-2'>Generate Keys</span>
                            </MDBBtn>
                            <MDBBtn
                                color='danger'
                                id='clear-btn'
                                onClick={handleClearKeys}
                                className="w-100 mb-5"
                            >
                                {clearSpinner && <MDBSpinner size='sm' role='status' tag='span' />}
                                <span className='px-2'>Clear Keys</span>
                            </MDBBtn>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow >
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer >
    )
}

export default KeysDataOwner;
