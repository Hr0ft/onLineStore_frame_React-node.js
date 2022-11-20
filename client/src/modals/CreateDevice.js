import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { createDevice, fetchBrands, fetchTypes } from '../http/deviceApi';
import { Context } from '../index';

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    console.log(info);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    formData.append('info', JSON.stringify(info));
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => {
                return (
                  <Dropdown.Item
                    key={type.id}
                    onClick={() => device.setSelectedType(type)}
                  >
                    {type.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || 'Выберите брэнд'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => {
                return (
                  <Dropdown.Item
                    key={brand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                  >
                    {brand.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устойства"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите стоимость"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            добавить новое свойство
          </Button>
          {info.map((characteristic) => (
            <Row className="mt-3" key={characteristic.number}>
              <Col md={4}>
                <Form.Control
                  placeholder="Введите название характеристики"
                  value={characteristic.title}
                  onChange={(e) =>
                    changeInfo('title', e.target.value, characteristic.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Введите описание характеристики"
                  value={characteristic.description}
                  onChange={(e) =>
                    changeInfo(
                      'description',
                      e.target.value,
                      characteristic.number
                    )
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  variant={'outline-danger'}
                  onClick={() => removeInfo(characteristic.number)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>
          Закрыть
        </Button>
        <Button variant={'outline-success'} onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
