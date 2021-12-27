import {ListGroup} from "react-bootstrap";

const NamesList = ({ items, template }) => {

  return (
    <ListGroup>
      {items.map((item, index, items) => {
        return (
          <ListGroup.Item key={item.id}>
            {template ? template(item, index, items): item}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default NamesList