import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../API/Login';
import { useNavigate } from "react-router-dom";
import Modal from '../Components/Modal';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBRadio,
    MDBSpinner
} from 'mdb-react-ui-kit';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userType, setUserType] = useState('users');
    const [modalContent, setModalContent] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup');
    }
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
                localStorage.setItem('token', `bearer ${response.token}`);
                localStorage.setItem('userType', response.userType);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            else if (response.status === 401) {
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

                <MDBCol col='6' md='4' className="text-center text-md-end my-5 mt-5">
                <h1 className="text-center text-primary mb-4">Login to your account</h1>
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
                        <div className="d-flex justify-content-center mx-4 mb-4 col-md-10 align-items-center">
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

                        <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                            {spinner && <MDBSpinner size='sm' role='status' tag='span' />}
                            <span className='px-2'>Login</span>
                        </MDBBtn>
                    </form>
                    <p className="mb-5 pb-lg-2 text-center">Don't have an account? <span className='pointer text-primary' onClick={navigateToSignup}>Signup</span></p>
                </MDBCol>

            </MDBRow>
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer>
    );
}

export default Login;
