import React, { useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBContainer } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import Modal from '../Components/Modal';
import { getUsersByDept } from '../Hooks/Users';


export default function Table() {
    const [users, setUsers] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    useEffect(() => {
        try {
            const data = getUsersByDept();
            if (data.status === 200) {
                setUsers(data);
                console.log(data);
            }
            else if (data.status >= 400 && data.status <= 500) {
                throw Error(data.message || data.error || 'Unable to fetch');
            }
        }
        catch (err) {
            setModalContent(err.message)
        }
    }, [users])
    return (
        <MDBContainer>
            <MDBTable align='middle' hover>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {users !== null &&
                        users.user.map((user, index) => {
                            return (
                                <tr>
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
                                        <p className='fw-normal mb-1'>{user.role.split('_')}</p>
                                        <p className='text-muted mb-0'>{user.department}</p>
                                    </td>
                                    <td>
                                        <MDBBadge color='success' pill>
                                            Active
                                        </MDBBadge>
                                    </td>
                                    <td>
                                        <MDBBtn color='link' rounded size='sm'>
                                            Edit
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