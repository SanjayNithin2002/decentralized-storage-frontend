import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { signupUser } from '../API/Signup';
import Roles from '../Roles.json';
import Modal from '../Components/Modal';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBSpinner
} from 'mdb-react-ui-kit';

function Signup() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [modalContent, setModalContent] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [department, setDepartment] = useState('');
    const [selected, setSelected] = useState(false);
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    const onSubmit = async (data) => {
        setSpinner(true);
        try {
            const response = await signupUser({
                name: data.name,
                email: data.email,
                password: data.password,
                department: data.department,
                role: data.role !== 'DataOwners' ? data.role : '',
                userType: data.role === 'DataOwners' ? 'dataowners' : 'users',
            });
            if (response.status === 201) {
                setModalContent(response.message);
            } else if (response.status === 401) {
                setModalContent(response.error)
            }
            else {
                setModalContent(response.error)
            }
        } catch (error) {
            setModalContent('500 Internal Server Error')
        } finally {
            setSpinner(false);
            setTimeout(() => setModalContent(null), 5000);
        }
    };


    return (
        <MDBContainer fluid className="p-5 my-5 mt-0">
            <MDBRow className="align-items-start">
                <MDBCol col='18' md='7' className='text-center text-md-start d-flex flex-column justify-content-center'>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        Decentralized Storage <br />
                        <span className="text-primary">for your organization</span>
                    </h1>
                    <MDBRow className='px-3 col-md-11'>
                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.25rem' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                            like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </MDBRow>
                </MDBCol>
                <MDBCol col='6' md='4' className="text-center text-md-end mt-5">
                    <h1 className="text-center text-primary mb-4">Create a new account</h1>
                    <MDBInput
                        wrapperClass='mb-4'
                        label='Name'
                        id='name'
                        type='text'
                        size="lg"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Email address'
                            id='email'
                            type='email'
                            size="lg"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Password'
                            id='password'
                            type='password'
                            size="lg"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                        <select
                            className={department === '' ? "form-select mb-4 text-muted" : "form-select mb-4"}
                            id="department"
                            name="department"
                            {...register("department", { required: 'Department is required' })}
                            onChange={e => {
                                setDepartment(e.target.value);
                                setValue('role', '');
                            }}
                        >
                            <option value="" disabled selected>Select Department</option>
                            {Object.keys(Roles).map((key) => (
                                <option
                                    key={key}
                                    value={key}
                                >
                                    {key}
                                </option>
                            ))}
                        </select>
                        {errors.department && <p>{errors.department.message}</p>}
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
                            {department !== '' && Roles[department].map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        {errors.role && <p>{errors.role.message}</p>}
                        <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                            {spinner && <MDBSpinner size='sm' role='status' tag='span' />}
                            <span className='px-2'>Signup</span>
                        </MDBBtn>
                    </form>
                    <p className="mb-5 pb-lg-2 text-center">Already have an account? <span className='pointer text-primary' onClick={navigateToLogin}>Login</span></p>
                </MDBCol>
            </MDBRow>
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer>
    );
}

export default Signup;
