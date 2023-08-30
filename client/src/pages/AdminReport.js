import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchReport} from "../http/reportAPI";
import {Col, Container, Form} from "react-bootstrap";
import ReportList from "../components/ReportList";
import Pages from "../components/Pages";

const AdminReport =  observer(() => {
    const {report} = useContext(Context)

    useEffect(() => {
        fetchReport().then(data => {
            report.setReports(data.rows)
            report.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchReport(report.page, 3).then(data => {
            report.setReports(data.rows)
            report.setTotalCount(data.count)
        })
    }, [report.page])

    return (
        <Container>
            <Form className="mt-4">
                <Col md = {9}>
                    <ReportList/>
                    <Pages/>
                </Col>
            </Form>
        </Container>
    );
});

export default AdminReport;