import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../API/Actions';
import { useNavigate } from "react-router-dom";
import Modal from '../Components/Modal';
import InfoPane from '../Components/InfoPane';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBRadio,
    MDBSpinner,
    MDBInputGroup
} from 'mdb-react-ui-kit';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userType, setUserType] = useState('users');
    const [modalContent, setModalContent] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setSpinner(true);
        try {
            const response = await loginUser({
                email: data.email,
                password: data.password,
                userType
            });
            if (response.status === 201) {
                setModalContent(response.message);
                localStorage.setItem('token', response.token);
                localStorage.setItem('userType', userType);
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('loginTime', Date.now());
                setTimeout(() => navigate('/home'), 1000);
            }
            else if (response.status === 401) {
                setModalContent(response.error)
            }
            else {
                setModalContent(response.error);
            }
        } catch (error) {
            setModalContent('500 Internal Server Error')
        } finally {
            setSpinner(false);
            setTimeout(() => setModalContent(null), 5000);
        }
    };


    return (
        <MDBContainer fluid className="m-0">
            <MDBRow className="align-items-start">
                <InfoPane />
                <MDBCol col='6' md='4' className="text-center text-md-end mx-3 my-auto px-auto pt-auto">
                    <div className='square border rounded-7 shadow-4'>
                        <div className='px-3 mt-4'>
                            <h1 className="text-center text-primary mb-4">Log into your account</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email address'
                                    id='email'
                                    type='email'
                                    size='lg'
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && <p className='text-primary'>{errors.email.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    id='password'
                                    type='password'
                                    size='lg'
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <p className='text-primary'>{errors.password.message}</p>}
                                <div className="mb-4 col-md-12 align-items-center d-flex flex-column flex-md-row justify-content-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <MDBRadio
                                            name='userType'
                                            id='dataOwner'
                                            value='dataowners'
                                            label='Data Owner'
                                            checked={userType === 'dataowners'}
                                            onChange={() => setUserType('dataowners')}
                                            inline
                                        />
                                        <MDBRadio
                                            name='userType'
                                            id='user'
                                            value='users'
                                            label='User'
                                            checked={userType === 'users'}
                                            onChange={() => setUserType('users')}
                                            inline
                                        />
                                    </div>
                                </div>

                                <MDBBtn className="mb-3 w-100" size='lg' type="submit">
                                    {spinner && <MDBSpinner size='sm' role='status' tag='span' />}
                                    <span className='px-2'>Login</span>
                                </MDBBtn>
                            </form>
                            <p className="mb-4 pb-lg-2 text-center">Don't have an account? <span className='pointer text-primary' onClick={e => navigate('/signup')}>Signup</span></p>
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

export default Login;
