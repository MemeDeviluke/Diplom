import React from 'react';
import {Container, Form, Card} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {
    KOLMOGOROV_ROUTE,
    PIRSON_ROUTE,
    REPORT_ROUTE,
    RESEARCH_ROUTE,
    TEORIA_ROUTE
} from "../utils/consts";

const StartPage = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style = {{height: window.innerHeight - 54}}
        >
            <Card style={{width:800}} className="p-5">
                <h2 className="m-auto">Карта навигации по приложению</h2>
                <Form className="d-flex justify-content-between mt-4 pl-3 pr-3">
                    <div>
                        Общая теория проверки статистических гипотез <NavLink to={TEORIA_ROUTE}>Нажми СЮДА</NavLink>
                    </div>
                </Form>
                <Form className="d-flex justify-content-between mt-4 pl-3 pr-3">
                    <div>
                        Работа с критерием Пирсона <NavLink to={PIRSON_ROUTE}>Нажми СЮДА</NavLink>
                    </div>
                </Form>
                <Form className="d-flex justify-content-between mt-4 pl-3 pr-3">
                    <div>
                        Работа с критерием Колмогорова <NavLink to={KOLMOGOROV_ROUTE}>Нажми СЮДА</NavLink>
                    </div>
                </Form>
                <Form className="d-flex justify-content-between mt-4 pl-3 pr-3">
                    <div>
                        Сравнительный анализ эффективности критериев <NavLink to={RESEARCH_ROUTE}>Нажми СЮДА</NavLink>
                    </div>
                </Form>
                <Form className="d-flex justify-content-between mt-4 pl-3 pr-3">
                    <div>
                        Отчёты <NavLink to={REPORT_ROUTE}>Нажми СЮДА</NavLink>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default StartPage;