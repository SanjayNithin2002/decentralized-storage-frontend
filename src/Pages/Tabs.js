import React, { useEffect, useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Users from './Users';
import Files from './Files';
import Home from './Home';
import Upload from './Upload';
import KeysDataOwner from './KeysDataOwner';
import KeysUser from './KeysUser';
import Profile from '../Components/Profile';

const Tabs = () => {
    const [tabsActive, setTabsActive] = useState('home');
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('userType')) {
            navigate('/login');
        }
        else {
            setUserType(localStorage.getItem('userType'));
        }
    }, [navigate]);

    const handleClick = (value) => {
        setTabsActive(value);
    };

    return (
        <>
            {userType !== null && userType === 'dataowners' &&
                <>
                    <MDBTabs justify className='mb-3'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('home')} active={tabsActive === 'home'}>
                                <MDBIcon fas icon="home" className='me-2' />Home
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('upload')} active={tabsActive === 'upload'}>
                                <MDBIcon fas icon="cloud-upload-alt" className='me-2' />Upload
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('users')} active={tabsActive === 'users'}>
                                <MDBIcon fas icon="users" className='me-2' />Users
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('files')} active={tabsActive === 'files'}>
                                <MDBIcon fas icon="folder-open" className='me-2' /> Files
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('keys')} active={tabsActive === 'keys'}>
                                <MDBIcon fas icon="key" className='me-2' />Keys
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <Profile />
                    </MDBTabs>

                    <MDBTabsContent>
                        <MDBTabsPane open={tabsActive === 'home'}><Home /></MDBTabsPane>
                        <MDBTabsPane open={tabsActive === 'upload'}><Upload /></MDBTabsPane>
                        <MDBTabsPane open={tabsActive === 'users'}><Users /></MDBTabsPane>
                        <MDBTabsPane open={tabsActive === 'files'}><Files /></MDBTabsPane>
                        <MDBTabsPane open={tabsActive === 'keys'}><KeysDataOwner /></MDBTabsPane>
                    </MDBTabsContent>
                </>
            }

            {
                userType !== null && userType === 'users' &&
                <>
                    <MDBTabs fill className='mb-3'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('home')} active={tabsActive === 'home'}>
                                <MDBIcon fas icon="home" className='me-2' />Home
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('files')} active={tabsActive === 'files'}>
                                <MDBIcon fas icon="folder-open" className='me-2' /> Files
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('keys')} active={tabsActive === 'keys'}>
                                <MDBIcon fas icon="key" className='me-2' /> Keys
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>

                    <MDBTabsContent>
                        <MDBTabsPane open={tabsActive === 'home'}><Home /></MDBTabsPane>
                        <MDBTabsPane open={tabsActive === 'files'}><Files /></MDBTabsPane>
                        <MDBTabsPane open={tabsActive === 'keys'}><KeysUser /></MDBTabsPane>
                    </MDBTabsContent>
                </>
            }
        </>
    );
};

export default Tabs;