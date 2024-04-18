import React, { useState, useEffect } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { getUsersByDept, approveUserById, deleteUserById } from '../API/Actions';
import UserTable from '../Components/UserTable';
import Modal from '../Components/Modal';

const Users = () => {
    const [users, setUsers] = useState(null);
    const [modalContent, setModalContent] = useState(null);

    const fetchUsers = async (flag = false) => {
        try {
            const data = await getUsersByDept();
            if (data.status === 200) {
                if(flag){
                    setUsers(data);
                }
                return data;
            } else if (data.status >= 400 && data.status <= 500) {
                throw new Error(data.error || 'Unable to fetch');
            }
        } catch (err) {
            setModalContent(err.message);
            return null;
        }
    }

    const handleAction = (activationFunction) => async (id) => {
        try {
            const data = await activationFunction(id);
            if (data.status === 200) {
                setModalContent(data.message);
                setTimeout(async () => {
                    const updatedData = await fetchUsers();
                    if (updatedData !== null) {
                        setUsers(updatedData);
                    }
                }, 5000);
            } else if (data.status >= 400 && data.status <= 500) {
                throw new Error(data.message || data.error || 'Unable to fetch');
            }
        } catch (err) {
            setModalContent(err.message);
        }
        finally {
            setTimeout(() => setModalContent(null), 3000);
        }
    }

    useEffect(() => {
        fetchUsers(true);
    }, []);

    return (
        <MDBContainer>
            {users !== null &&
                <UserTable
                    handleApprove={handleAction(approveUserById)}
                    handleDelete={handleAction(deleteUserById)}
                    users={users}
                />
            }
            {modalContent !== null &&
                <Modal title={modalContent} />
            }
        </MDBContainer>
    );
}

export default Users;
