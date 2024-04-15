import React, { useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import Modal from '../Components/Modal';
import {getUsersByDept} from '../API/Actions';


export default function Table() {
    const [users, setUsers] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsersByDept(); // Await for the promise to resolve
                if (data.status === 200) {
                    setUsers(data);
                } else if (data.status >= 400 && data.status <= 500) {
                    throw new Error(data.message || data.error || 'Unable to fetch');
                }
            } catch (err) {
                setModalContent(err.message);
            }
        };

        fetchData(); // Call the async function
    }, [users]);

    const handleApprove = (e) => {
        console.log(e);
    }

    const handleDelete = (e) => {
        console.log(e);
    }


    return (
        <MDBContainer>
            <MDBTable align='middle' hover>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Approve</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {users !== null &&
                        users.user.map((user, index) => {
                            return (
                                <tr key={user.id}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://cdn-icons-png.freepik.com/512/9131/9131590.png'
                                                alt=''
                                                style={{ width: '35px', height: '35px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{user.name}</p>
                                                <p className='text-muted mb-0'>{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{user.role.split('_').join(' ')}</p>
                                        <p className='text-muted mb-0'>{user.department}</p>
                                    </td>
                                    <td>
                                        <MDBBadge color={user.status === 'Pending' ? 'warning' : 'success'} pill>
                                            {user.status}
                                        </MDBBadge>
                                    </td>
                                    <td>
                                        <MDBBtn color='primary' rippleColor='light' className={`rounded-1 ${user.status === 'Pending' ? '' : 'disabled'}`} onClick={e => handleApprove(user.id)} size='sm'>
                                            Approve
                                        </MDBBtn>
                                    </td>
                                    <td>
                                        <MDBBtn color='danger' rippleColor='light' className='rounded-1' size='sm' onClick={e => handleDelete(user.id)}>
                                            <MDBIcon fas icon="trash" />
                                        </MDBBtn>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </MDBTableBody>
            </MDBTable>
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer>
    );
}