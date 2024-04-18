import React, { useState } from "react";
import { MDBContainer, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
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
        <MDBContainer>
            <MDBBtn
                id='generate-btn'
                onClick={handleGetKeys}
            >
                {getSpinner && <MDBSpinner size='sm' role='status' tag='span' />}
                <span className='px-2'>Get Keys</span>
            </MDBBtn>
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer>
    )
}

export default KeysUser;