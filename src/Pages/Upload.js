import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postFile } from '../API/Actions';
import Modal from '../Components/Modal';
import InfoPane from '../Components/InfoPane';
import {getRoles} from '../Hooks/rolesList';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBFile,
    MDBSpinner
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
        <MDBContainer fluid className="my-5 mt-0">
            <MDBRow className="align-items-start">
                <InfoPane />
                <MDBCol col='6' md='4' className="text-center text-md-end my-5 px-3 pt-5">
                    <div className='square border rounded-7'>
                        <div className='px-3 mt-5'>
                            <h1 className="text-center text-primary mb-4">Upload file</h1>
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

                                <MDBFile
                                    label='File'
                                    id='file'
                                    name='file'
                                    {...register('file', { required: 'File is required' })}
                                />
                                {errors.file && <p className='text-primary'>{errors.file.message}</p>}
                                <br />

                                <MDBFile
                                    label='Key'
                                    id='key'
                                    name='key'
                                    accept='.key'
                                    {...register('key', { required: 'Key is required' })}
                                />
                                {errors.key && <p className='text-primary'>{errors.key.message}</p>}
                                <br />


                                <MDBBtn className="mb-4 w-100 pb-lg-2 " size="lg" type="submit">
                                    {spinner && <MDBSpinner size='sm' role='status' tag='span' />}
                                    <span className='px-2'>Upload</span>
                                </MDBBtn>
                            </form>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer>
    );
}

export default Upload;
