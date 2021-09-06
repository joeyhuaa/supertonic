import _Dropdown from 'react-bootstrap/Dropdown'

export default function Dropdown({
  items
}) {
  return (
    <_Dropdown>
      <_Dropdown.Toggle variant="success" id="dropdown-basic">
        Branch
      </_Dropdown.Toggle>

      <_Dropdown.Menu>
        {items.map((item, idx) => (
          <Dropdown.Item 
            onClick={item.callback}
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </_Dropdown.Menu>
    </_Dropdown>
  )
}