import React, { useState, useEffect } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { getFilesByDept, getFileById, verifyFileById, deleteFileById } from '../API/Actions';
import Modal from '../Components/Modal';
import FileTable from '../Components/FileTable';
import VerifyModal from '../Components/VerifyModal';

const Files = () => {
    const [files, setFiles] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const [verifyModal, setVerifyModal] = useState(null);

    const userType = localStorage.getItem('userType');

    const fetchFiles = async (flag = false) => {
        try {
            const data = await getFilesByDept();
            if (data.status === 200) {
                if (flag) {
                    setFiles(data);
                }
                return data;
            } else if (data.status >= 400 && data.status <= 500) {
                throw new Error(data.message || data.error || 'Unable to fetch');
            }
        } catch (err) {
            setModalContent(err.message);
            return null;
        }
        finally {
            setTimeout(() => setModalContent(null), 3000);
        }
    }

    const handleView = async ({ id, key }) => {
        try {
            if (!key) {
                throw Error('Please upload the key file.');
            }
            const data = await getFileById({ id, key });
            if (data instanceof Blob) {
                const url = URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = url;
                link.download = `downloaded_file_${Date.now()}`
                link.click();
            } else {
                throw new Error(data.message || data.error || 'Unable to fetch');
            }
        } catch (err) {
            setModalContent(err.message);
        }
        finally {
            setTimeout(() => setModalContent(null), 3000);
        }
    }

    const handleVerify = async ({ id, key }) => {
        try {
            if (!key) {
                throw Error('Please upload the key file.');
            }
            const response = await verifyFileById({ id, key });
            if (response.status === 200) {
                setVerifyModal(response);
            } else {
                throw new Error(response.message || response.error || 'Unable to fetch');
            }
        } catch (err) {
            setModalContent(err.message);
        }
        finally {
            setTimeout(() => setModalContent(null), 3000);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await deleteFileById(id);
            if (response.status === 200) {
                setModalContent(response.message);
                setTimeout(async () => {
                    const updatedData = await fetchFiles();
                    if(updatedData){
                        setFiles(updatedData);
                    }
                }, 5000);
            } else {
                throw new Error(response.message || response.error || 'Unable to fetch');
            }
        } catch (err) {
            setModalContent(err.message);
        }
        finally {
            setTimeout(() => setModalContent(null), 3000);
        }
    }

    useEffect(() => {
        fetchFiles(true);
    }, []);

    return (
        <MDBContainer className='mb-4'>
            {files !== null &&
                <FileTable
                    files={files}
                    handleView={handleView}
                    handleVerify={handleVerify}
                    handleDelete={handleDelete}
                    userType={userType}
                />
            }
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
            {verifyModal !== null &&
                <VerifyModal title="Inegrity Verification" body={verifyModal} handleStateChange={() => setVerifyModal(null)}/>
            }
        </MDBContainer>
    );
}

export default Files;
