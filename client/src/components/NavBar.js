import React, {useContext} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, STARTPAGE_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";



const NavBar = observer(() => {
    const {user} = useContext(Context)
    const  navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setisAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={STARTPAGE_ROUTE}>Web-приложение для исследования методов проверки статистических гипотез</NavLink>
                <Navbar.Brand>Разработано Валеевом Марселем</Navbar.Brand>
                {user.isAuth ?
                <Nav className="ml-auto" style={{color:'white'}}>
                    <Button
                        variant={"outline-light"}
                        onClick={() => navigate(ADMIN_ROUTE)}
                    >
                        Режим Администратора
                    </Button>
                    <Button
                        variant={"outline-light"}
                        onClick={() => logOut()}
                        className="ml-4"
                    >
                        Выйти
                    </Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{color:'white'}}>
                    <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;