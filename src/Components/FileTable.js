import React, { useState } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBFile, MDBSpinner, MDBIcon } from 'mdb-react-ui-kit';

const FileTable = (props) => {
    const { files, userType, handleView, handleVerify, handleDelete } = props;
    const [viewSpinner, setViewSpinner] = useState(null);
    const [verifySpinner, setVerifySpinner] = useState(null);
    const [deleteSpinner, setDeleteSpinner] = useState(null);

    const handleViewChild = async ({id, name}) => {
        setViewSpinner(id);
        const key = document.getElementById(id).files[0];
        await handleView({
            key,
            id,
            name
        });
        setViewSpinner(null);
    }

    const handleVerifyChild = async (id) => {
        setVerifySpinner(id);
        const key = document.getElementById(id).files[0];
        await handleVerify({
            key,
            id
        });
        setVerifySpinner(null);
    }
    const handleDeleteChild = async (id) => {
        setDeleteSpinner(id);
        await handleDelete(id);
        setDeleteSpinner(null);
    }

    const headers = ['File', 'Role', 'Type', 'Key', 'View', 'Verify', 'Delete']
    return (
        <MDBTable align='middle' hover striped responsive>
            <MDBTableHead>
                <tr className='bg-primary'>
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
                {files !== null &&
                    files.files.map((file, index) => {
                        return (
                            <tr key={file.id}>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <MDBIcon fas icon="folder-open" className='me-2 text-primary' size='2x' />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{file.title}</p>
                                            <p className='text-muted mb-0'>{file.uploadedAt}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className='fw-normal mb-1'>{file.role.split('_').join(' ')}</p>
                                    <p className='text-muted mb-0'>{file.department}</p>
                                </td>
                                <td>
                                    <p className='fw-normal mb-1'>{file.mimetype}</p>
                                    <p className='text-muted mb-0'>{file.size}</p>
                                </td>
                                <td className='text-center' style={{ width: '18em' }}>
                                    <MDBFile
                                        id={file.id}
                                        name='file'
                                        size='sm'
                                        accept='.key'
                                    />
                                </td>
                                <td className='text-center'>
                                    <MDBBtn color='primary' rippleColor='light' className='bg-primary  rounded-4' onClick={e => handleViewChild({id: file.id, name: file.originalName})} size='sm'>
                                        {viewSpinner !== null && viewSpinner === file.id && <MDBSpinner size='sm' role='status' tag='span' />}
                                        <span className='px-2'>View</span>
                                    </MDBBtn>
                                </td>
                                <td className='text-center'>
                                    <MDBBtn color='primary' rippleColor='light' className='bg-primary rounded-4' size='sm' onClick={e => handleVerifyChild(file.id)}>
                                        {verifySpinner !== null && verifySpinner === file.id && <MDBSpinner size='sm' role='status' tag='span' />}
                                        <span className='px-2'>Verify</span>
                                    </MDBBtn>
                                </td>
                                <td className='text-center'>
                                    <MDBBtn color='danger' rippleColor='light' className='rounded-4' size='sm' onClick={e => handleDeleteChild(file.id)} disabled={userType !== 'dataowners'}>
                                        {deleteSpinner !== null && deleteSpinner === file.id && <MDBSpinner size='sm' role='status' tag='span' />}
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

export default FileTable;