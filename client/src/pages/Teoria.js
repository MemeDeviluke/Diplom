import React from 'react';
import {Container, Form, Image, Table} from "react-bootstrap";
import sova from "../assets/sova.png";
import FirstOBSH from "../assets/FirstOBSH.png";
import SecondOBSH from "../assets/SecondOBSH.png"

const Teoria = () => {
    return (
        <Container>
            <Table size={'sm'}>
                <thead>
                    <tr>
                        <th><Image src={FirstOBSH} className="mt-2"/></th>
                        <th><Image src={SecondOBSH} className="mt-0"/></th>
                    </tr>
                </thead>
            </Table>
        </Container>
    );
};

export default Teoria;