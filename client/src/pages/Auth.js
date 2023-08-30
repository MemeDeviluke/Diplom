import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, STARTPAGE_ROUTE} from "../utils/consts";
import {enter ,registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer( ()=> {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const click = async () =>{
        try{
            let data;
            if(isLogin) {
                data = await enter(login, password);
            } else {
                data = await registration(login, password);
            }
            user.setUser(data)
            user.setisAuth(true)
            navigate(STARTPAGE_ROUTE)
        } catch(e) {
            alert(e.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style = {{height: window.innerHeight - 54}}
        >
          <Card style={{width:600}} className="p-5">
              <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
              <Form className="d-flex flex-column">
                  <Form.Control
                      className="mt-3"
                      placeholder="Введите ваш логин..."
                      value = {login}
                      onChange={e => setLogin(e.target.value)}
                  />
                  <Form.Control
                      className="mt-3"
                      placeholder="Введите ваш пароль..."
                      value = {password}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                  />
                  <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                      {isLogin ?
                      <div>
                          Зарегистрироваться? <NavLink to={REGISTRATION_ROUTE}>Нажми СЮДА</NavLink>
                      </div>
                          :
                          <div>
                          Уже зарегистрированы? <NavLink to={LOGIN_ROUTE}>Нажми СЮДА</NavLink>
                          </div>
                      }
                      <Button
                          variant={"outline-warning"}
                          onClick={click}
                      >
                          {isLogin? 'Войти' : 'Регистрация'}
                      </Button>
                  </Row>
              </Form>
          </Card>
        </Container>
    );
});

export default Auth;