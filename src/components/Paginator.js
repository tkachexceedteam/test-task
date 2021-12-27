import {Container, Dropdown, Pagination} from "react-bootstrap";

const Paginator = ({page, pageSize, totalPages, onChange, perPageParams}) => {
  const nextPage = () => {
    onChange({page: page + 1, pageSize})
  }

  const prevPage = () => {
    onChange({page: page - 1, pageSize})
  }

  const changePage = (e) => {
    onChange({page: e, pageSize})
  }

  const firstPage = () => {
    onChange ({page: 1, pageSize})
  }

  const lastPage = () => {
    onChange ({page: totalPages, pageSize})
  }

  const items = []

  let firstItem = page - 2
  let lastItem = page + 2
  if (firstItem < 1) {
    firstItem = 1
    lastItem = 5
  }
  if (totalPages - page <= 2) {
    lastItem = totalPages
    firstItem = totalPages - 4
  }

  for (let number = firstItem; number <= lastItem; number++) {
    if (number > 0 && number <= totalPages)
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => changePage(number)}
        >
          {number}
        </Pagination.Item>,
      );
  }

  const perPageChange = (pageSize) => {
    onChange({page: 1, pageSize})
  }

  return (
    <Container>
      <Pagination className={'justify-content-center'}>
        {totalPages > 5 &&
          <>
            <Pagination.First
              disabled={page <= 1}
              onClick={firstPage}
            />
            <Pagination.Prev
              onClick={prevPage}
              disabled={page <= 1}
            />
          </>
        }

        {items}

        {totalPages > 5 && (
          <>
            <Pagination.Next
              onClick={nextPage}
              disabled={page >= totalPages}
            />
            <Pagination.Last
              disabled={page >= totalPages}
              onClick={lastPage}
            />
          </>
        )}
      </Pagination>
      {totalPages > 5 &&
        <p>Total pages: {totalPages}</p>
      }
      {perPageParams && (
        <Dropdown>
          <Dropdown.Toggle>
            Items per page: {pageSize}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {perPageParams.map(item => {
              return (
                <Dropdown.Item onClick={() => perPageChange(item.value)}>{item.label}</Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Container>
  );
}



export default Paginator