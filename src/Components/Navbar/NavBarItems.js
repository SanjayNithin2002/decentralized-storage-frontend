import React from 'react';
import {
    MDBNavbarItem,
    MDBNavbarLink,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import pageAccessList from '../../Hooks/pageAccessList';

const NavBarItems = () => {
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType');
    if (!userType) return null;

    const accessList = pageAccessList(userType);
    if (!accessList) return null;

    return accessList.map((page, index) => (
        <MDBNavbarItem key={index}>
            <MDBNavbarLink
                onClick={() => navigate(page.endpoint)}
                className='nav-link'
            >
                {page.name}
            </MDBNavbarLink>
        </MDBNavbarItem>
    ));
};

export default NavBarItems;