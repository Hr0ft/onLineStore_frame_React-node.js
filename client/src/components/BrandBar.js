import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Context } from '../index';

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row>
      <Col className="d-flex flex-wrap">
        {device.brands.map((brand) => (
          <Card
            style={{ cursor: 'pointer' }}
            key={brand.id}
            className="p-3"
            border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
            onClick={() => device.setSelectedBrand(brand)}
          >
            {brand.name}
          </Card>
        ))}
      </Col>
    </Row>
  );
});

export default BrandBar;
