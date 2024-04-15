import React, { useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit';

const UserTable = (props) => {
    const { users, handleApprove, handleDelete } = props;
    const [approveSpinner, setApproveSpinner] = useState(null);
    const [deleteSpinner, setDeleteSpinner] = useState(null);

    const handleApproveChild = async (id) => {
        setApproveSpinner(id);
        await handleApprove(id);
        setApproveSpinner(null);
    }

    const handleDeleteChild = async (id) => {
        setDeleteSpinner(id);
        await handleDelete(id);
        setDeleteSpinner(null);
    }

    const headers = ['Name', 'Role', 'Status', 'Approve', 'Delete']
    return (
        <MDBTable align='middle' hover striped responsive>
            <MDBTableHead>
                <tr style={{ backgroundColor: '#386bc0' }}>
                    {headers &&
                        headers.map((header, index) => {
                            return (
                                <th className='text-center text-white' scope='col' key={index}>{header}</th>
                            )
                        })
                    }
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
                                <td className='text-center'>
                                    <MDBBadge color={user.status === 'Pending' ? 'warning' : 'success'} pill>
                                        {user.status}
                                    </MDBBadge>
                                </td>
                                <td className='text-center'>
                                    <MDBBtn color='primary' rippleColor='light' className={`rounded-4 ${user.status === 'Pending' ? '' : 'disabled'}`} onClick={e => handleApproveChild(user.id)} size='sm'>
                                        {approveSpinner !== null && approveSpinner === user.id && <MDBSpinner size='sm' role='status' tag='span' />}
                                        <span className='px-2'>Approve</span>
                                    </MDBBtn>
                                </td>
                                <td className='text-center'>
                                    <MDBBtn color='danger' rippleColor='light' className='rounded-4' size='sm' onClick={e => handleDeleteChild(user.id)}>
                                        {deleteSpinner !== null && deleteSpinner === user.id && <MDBSpinner size='sm' role='status' tag='span' />}
                                        <MDBIcon className='px-2' fas icon="trash" />
                                    </MDBBtn>
                                </td>
                            </tr>
                        )
                    })
                }
            </MDBTableBody>
        </MDBTable>
    );
}

export default UserTable;