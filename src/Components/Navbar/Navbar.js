import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBCollapse,
  MDBIcon,
} from 'mdb-react-ui-kit';
import Profile from '../Profile';
import NavBarItems from './NavBarItems';

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);


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
            <NavBarItems/>
          </MDBNavbarNav>
          <Profile />
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
