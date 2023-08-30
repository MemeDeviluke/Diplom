import React from 'react';
import {Button, Card, Col, Image} from 'react-bootstrap'
import sova from '../assets/sova.png'
import { useNavigate } from "react-router-dom"
import {REPORT_ROUTE, REPORTONE_ROUTE} from "../utils/consts";
const ReportItem = ({report}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className={"mt-2"}>
            <Card style = {{width:180, height:120, cursor: 'pointer'}} border={"dark"} onClick={() => navigate(REPORTONE_ROUTE + '/' + report.id)}>
                <Image width ={160} height={110} src={sova} className="mt-1"/>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="mt-2">{report.data}</div>
                </div>
            </Card>
        </Col>
    );
};

export default ReportItem;