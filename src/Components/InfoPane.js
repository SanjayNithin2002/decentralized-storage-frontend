import React from "react";
import {
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';

const InfoPane = () => {
    return (
        <MDBCol col='18' md='7' className='p-5 text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                Decentralized Storage <br />
                <span className="text-primary">for your organization</span>
            </h1>

            <MDBRow className='px-3 col-md-11'>
                <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)', textAlign: 'justify', fontSize: '1.25rem' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </MDBRow>


        </MDBCol>
    )
}

export default InfoPane;