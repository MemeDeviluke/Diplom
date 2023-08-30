import React, {useContext, useEffect, useState} from 'react';
import {Container, Form, Col, Button} from "react-bootstrap";
import ReportList from "../components/ReportList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchReport} from "../http/reportAPI";
import Pages from "../components/Pages";
import CreateReport from "../components/modals/CreateReport";

const Reports = observer(() => {
    const {report} = useContext(Context)
    const [reportVisible, setReportVisible] = useState(false)

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
            <Button variant={"outline-primary"} className={"mt-4 p-2"} onClick={() => setReportVisible(true)}>Добавить отчёт</Button>
            <Form className="mt-4">
                <Col md = {9}>
                    <ReportList/>
                    <Pages/>
                </Col>
            </Form>
            <CreateReport show={reportVisible} onHide={() => setReportVisible(false)}/>
        </Container>
    );
});

export default Reports;