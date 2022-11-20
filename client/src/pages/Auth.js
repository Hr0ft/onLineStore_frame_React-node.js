import React, { useContext, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../utils/constants';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }

      user.setUser(user);
      user.setIsAuth(true);
      history(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите Ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Form>
        <Form className="d-flex justify-content-between mt-3">
          {isLogin ? (
            <div style={{ width: 'auto' }}>
              Нет аккаунта?
              <NavLink
                style={{ textDecoration: 'none' }}
                to={REGISTRATION_ROUTE}
              >
                Зарегистрируйся
              </NavLink>
            </div>
          ) : (
            <div style={{ width: 'auto' }}>
              Есть аккаунт?
              <NavLink style={{ textDecoration: 'none' }} to={LOGIN_ROUTE}>
                Войдите
              </NavLink>
            </div>
          )}
          <Button variant="outline-success" onClick={() => click()}>
            {isLogin ? 'Войти' : 'Регистрация'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
});
export default Auth;
