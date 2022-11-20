import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import star from '../assets/star.png';
import { DEVICE_ROUTE } from '../utils/constants';

const DeviceItem = ({ device }) => {
  const history = useNavigate();

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => history(DEVICE_ROUTE + '/' + device.id)}
    >
      <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        ></Image>
        <div className="d-flex justify-content-between mt-2">
          <div className="text-black-50">{device.name}</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={15} height={15} src={star}></Image>
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
