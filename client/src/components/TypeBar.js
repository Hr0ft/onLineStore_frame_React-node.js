import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '../index';

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <ListGroup>
      {device.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          key={type.id}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
