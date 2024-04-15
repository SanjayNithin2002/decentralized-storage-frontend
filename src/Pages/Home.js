import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Table from "../Components/Table";
import { MDBContainer } from 'mdb-react-ui-kit';
function Home() {
    return (
        <MDBContainer>
            <Table/>
        </MDBContainer>
    )
}

export default Home;