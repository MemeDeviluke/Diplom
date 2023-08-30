import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import ReportList from "../components/ReportList";
import Pages from "../components/Pages";
import CreateReport from "../components/modals/CreateReport";
import {Context} from "../index";
import {fetchReport} from "../http/reportAPI";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, ADMINREPORT_ROUTE} from "../utils/consts";

const Admin = observer(() => {
    const navigate = useNavigate()
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

    const [reportVisible, setReportVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-primary"} className={"mt-4 p-2"} onClick={() => setReportVisible(true)}>Добавить отчёт</Button>
            <Button variant={"outline-primary"} className={"mt-4 p-2"} onClick={() => navigate(ADMINREPORT_ROUTE)}>Просмотр отчётов</Button>
            <CreateReport show={reportVisible} onHide={() => setReportVisible(false)}/>
        </Container>
    );
});

export default Admin;