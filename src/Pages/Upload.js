import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postFile } from '../API/Actions';
import Modal from '../Components/Modal';
import { getRoles } from '../Hooks/rolesList';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBFile,
    MDBSpinner,
    MDBInputGroup,
    MDBIcon
} from 'mdb-react-ui-kit';

const Upload = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [modalContent, setModalContent] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [selected, setSelected] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    let department = '';
    if (user?.department) {
        department = user.department;
    }

    const onSubmit = async (data) => {
        setSpinner(true);
        try {
            const response = await postFile({
                title: data.title,
                role: data.role,
                key: data.key[0],
                file: data.file[0]
            });
            if (response?.status === 201) {
                setModalContent(response.message);
            }
            else {
                setModalContent(response.message || response.error)
            }
        } catch (error) {
            setModalContent(error.message || 'Not working')
        } finally {
            setSpinner(false);
            setTimeout(() => setModalContent(null), 5000);
        }
    };


    return (
        <MDBContainer className='mb-4'>
            <MDBRow className="align-items-start">
                <MDBCol col='18' md='8' className='text-center text-md-start d-flex flex-column justify-content-center mt-0'>
                    <div className="d-flex align-items-center mb-2">
                        <MDBIcon fab icon="dashcube" size="4x" className="me-0 text-primary" />
                        <h1 className="my-5 display-6 fw-normal ls-tight px-3">
                            <span className="text-primary">What happens </span>
                            <span>when you upload?</span>
                        </h1>
                    </div>

                    <MDBRow className='px-3 col-md-11'>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary"> i) Verifying the File:  </span>
                            The system calculates a unique fingerprint of the file, called a Merkle root.
                            This fingerprint helps ensure the file hasn't been tampered with during upload.</p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary"> ii) Securing the File:  </span>
                            The system retrieves the key file you provide in the upload request.
                            This key is then used to encrypt the main document. Encryption scrambles the file's contents, making it unreadable without the key.
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary"> iii) Securely Disposing of the Key:  </span>
                            It's important to note that after the encryption process, the system should securely dispose of the key you uploaded.
                            It is deleted using a CRON Job, which clears the uplod directory every five minutes.
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary">iv) Storing the Encrypted File: </span>
                            The encrypted document is uploaded to the cloud storage for safekeeping.
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary">v) Recording Information: </span>
                            The system extracts the department of the user uploading the file from their JSOn Web Token.
                            The department and role (given in the body), the Merkle root, file size, upload time, and other details are logged in a blockchain ledger.
                        </p>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.1rem' }}>
                            <span className="text-primary">vi) Immutable Upload:  </span>
                            Just like before, even though the file itself is encrypted in the cloud,
                            the upload process creates a permanent record of the file's original state in the blockchain ledger.
                        </p>
                    </MDBRow>
                </MDBCol>
                <MDBCol col='6' md='4' className="text-center text-md-end mx-auto my-auto px-auto pt-auto">
                    <div className='square border rounded-7 shadow-4 mb-4'>
                        <div className='px-3 mt-4'>
                            <h1 className="text-center text-primary mb-4">Upload</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Title'
                                    id='title'
                                    type='title'
                                    size="lg"
                                    {...register('title', { required: 'Title is required' })}
                                />
                                {errors.title && <p className='text-primary'>{errors.title.message}</p>}

                                <select
                                    className={!selected ? "form-select mb-4 text-muted" : "form-select mb-4"}
                                    id="role"
                                    name="role"
                                    {...register("role", { required: 'Role is required' })}
                                    onChange={e => {
                                        setSelected(true);
                                    }}
                                >
                                    <option value="" disabled selected>Select Role</option>
                                    {department !== '' && getRoles(department).map((value, index) => {
                                        if (value !== 'DataOwners') {
                                            return (
                                                <option key={index} value={value}>
                                                    {value}
                                                </option>
                                            )
                                        }
                                    })}
                                </select>
                                {errors.role && <p className='text-primary'>{errors.role.message}</p>}
                                <MDBInputGroup className='mb-4' textBefore='File' >
                                    <MDBFile
                                        id='file'
                                        name='file'
                                        {...register('file', { required: 'File is required' })}
                                    />
                                </MDBInputGroup>
                                {errors.file && <p className='text-primary'>{errors.file.message}</p>}
                                <MDBInputGroup className='mb-4' textBefore='Key' >
                                    <MDBFile
                                        id='key'
                                        name='key'
                                        accept='.key'
                                        {...register('key', { required: 'Key is required' })}
                                    />
                                </MDBInputGroup>
                                {errors.key && <p className='text-primary'>{errors.key.message}</p>}
                                <MDBBtn className="mb-5 w-100 pb-lg-2 " size="lg" type="submit">
                                    {spinner && <MDBSpinner size='sm' role='status' tag='span' />}
                                    <span className='px-2'>Upload</span>
                                </MDBBtn>
                            </form>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow >
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer >
    );
}

export default Upload;
