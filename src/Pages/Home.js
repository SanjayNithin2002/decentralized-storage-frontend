import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Table from "../Components/UserTable";
import { MDBContainer } from 'mdb-react-ui-kit';

const Home = () => {
    return (
        <MDBContainer>
            <Table/>
        </MDBContainer>
    )
}

export default Home;