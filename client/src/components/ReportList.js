import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Form} from "react-bootstrap";
import ReportItem from "./ReportItem";

const ReportList = observer(() => {
    const {report} = useContext(Context)
    return (
        <Form className="d-flex">
            {report.reports.map(report =>
                <ReportItem key = {report.id} report = {report}/>
            )}
        </Form>
    );
});

export default ReportList;