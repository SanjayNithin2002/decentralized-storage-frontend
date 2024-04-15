import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBRipple
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import getUserType from '../Hooks/getUserType';
import pageAccessList from '../Hooks/pageAccessList';

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  const navItems = () => {
    const userType = getUserType();
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

  return (
    <MDBNavbar className='fixed-top' expand='lg'>
      <MDBContainer fluid>
        <MDBNavbarBrand>DS</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav className='mr-auto'>
            {navItems()}
          </MDBNavbarNav>
          <Profile />
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
