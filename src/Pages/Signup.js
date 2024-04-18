import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { signupUser } from '../API/Actions';
import {getDepartments, getRoles} from '../Hooks/rolesList';
import Modal from '../Components/Modal';
import InfoPane from '../Components/InfoPane';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBSpinner
} from 'mdb-react-ui-kit';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [modalContent, setModalContent] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [department, setDepartment] = useState('');
    const [selected, setSelected] = useState(false);
    const navigate = useNavigate();
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
                setModalContent(`${response.message} You can login now.`);
                setTimeout(() => navigate('/login'), 1000);
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
        <MDBContainer fluid className="mb-4 m-0 d-flex justify-content-center align-items-center">
            <MDBRow >
                <InfoPane />
                <MDBCol col='6' md='4' className="text-center text-md-end mx-3 my-auto px-auto pt-auto pt-5 mt-4">
                    <div className='square border rounded-7 shadow-4'>
                        <div className='px-3 mt-4'>
                            <h3 className="text-center text-primary mb-4">Create a new account</h3>
                            <MDBInput
                                wrapperClass='mb-4'
                                label='Name'
                                id='name'
                                type='text'
                                size="lg"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <p className='text-primary'>{errors.name.message}</p>}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email address'
                                    id='email'
                                    type='email'
                                    size="lg"
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && <p className='text-primary'>{errors.email.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    id='password'
                                    type='password'
                                    size="lg"
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <p className='text-primary'>{errors.password.message}</p>}
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
                                    {getDepartments().map((key) => (
                                        <option
                                            key={key}
                                            value={key}
                                        >
                                            {key}
                                        </option>
                                    ))}
                                </select>
                                {errors.department && <p className='text-primary'>{errors.department.message}</p>}
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
                                    {department !== '' && getRoles(department).map((value, index) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && <p className='text-primary'>{errors.role.message}</p>}
                                <MDBBtn className="mb-3 w-100" size="lg" type="submit">
                                    {spinner && <MDBSpinner size='sm' role='status' tag='span' />}
                                    <span className='px-2'>Signup</span>
                                </MDBBtn>
                            </form>
                            <p className="mb-4 pb-lg-2 text-center">Already have an account? <span className='pointer text-primary' onClick={e => navigate('/login')}>Login</span></p>
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

export default Signup;
