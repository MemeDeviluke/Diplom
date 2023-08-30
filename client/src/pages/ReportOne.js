import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import sova from '../assets/sova.png'
import {NavLink, useParams} from "react-router-dom";
import {fetchOneReport} from "../http/reportAPI";


const ReportOne = () => {
    const [report, setReport] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneReport(id).then(data => setReport(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={340} height={220} src = {sova}/>
                </Col>
                <Col md={4}>
                    <Form className="d-flex flex-column align-items-center">
                        <h2>{report.data}</h2>
                        <div className="d-flex align-items-center justify-content-center"></div>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form className="d-flex flex-column m-3">
                        <h2>Свойства</h2>
                        {report.info.map((info , index) =>
                            <Row key={info.id} style={{background: index % 2 === 0? 'lightgray' : 'transparent', padding: 10}}>
                                {info.title}: {info.description}
                            </Row>
                        )}
                    </Form>
                </Col>
            </Row>
            <div>
                <a href={process.env.REACT_APP_API_URL + report.filerep} target="_blank">Открыть файл отчёта</a>
            </div>
        </Container>
    );
};

export default ReportOne;