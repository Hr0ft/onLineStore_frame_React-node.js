import { useEffect, useState } from 'react';
import { Container, Col, Image, Row, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import bigStar from '../assets/bigStar.svg';
import { fetchOneDevices } from '../http/deviceApi';

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevices(id).then((data) => setDevice(data));
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          ></Image>
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2 style={{ width: 'auto' }}>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                fontSize: 64,
                backgroundSize: 'cover',
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              border: '5px solid lightgray',
            }}
          >
            <h3
              style={{
                fontSize: 32,
              }}
            >
              От: {device.price} руб.
            </h3>
            <Button variant={'outline-dark'}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>

      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => {
          return (
            <Row
              key={info.id}
              style={{
                background: index % 2 === 0 ? 'lightgray' : 'transparant',
                padding: 10,
              }}
            >
              {info.title}:{info.description}
            </Row>
          );
        })}
      </Row>
    </Container>
  );
};
export default DevicePage;
