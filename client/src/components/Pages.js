import React, {useContext} from 'react';
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const Pages = observer(() => {
    const {report} = useContext(Context)
    const pageCount = Math.ceil(report.totalCount / report.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i+1)
    }

    return (
        <Pagination className="mt-sm-5">
            {pages.map(page =>
                <Pagination.Item
                    key = {page}
                    active={report.page === page}
                    onClick={() => report.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;