import React, { useState } from "react";
import { MDBContainer, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
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
            <MDBBtn
                id='generate-btn'
                onClick={handleGenerateKeys}
            >
                {generateSpinner && <MDBSpinner size='sm' role='status' tag='span' />}
                <span className='px-2'>Generate Keys</span>
            </MDBBtn>
            <MDBBtn
                color='danger'
                id='clear-btn'
                onClick={handleClearKeys}
            >
                {clearSpinner && <MDBSpinner size='sm' role='status' tag='span' />}
                <span className='px-2'>Clear Keys</span>
            </MDBBtn>
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer>
    )
}

export default KeysDataOwner;