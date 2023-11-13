import React, { Fragment, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";

const CustomPagination = ({
  currentPage,
  setCurrentPage,
  items,
  totalPages,
  setTotalPages,
  itemsPerPage,
  setPaginatedItems,
  handleChangeRowsPerPage,
}) => {
  useEffect(() => {
    if (items && itemsPerPage) {
      const totalItems = items.length;
      const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(totalPagesCount);
    }
    if (items && itemsPerPage && currentPage === 1) {
      const startIndex = 0;
      const endIndex = Math.min(itemsPerPage, items.length);
      const initialPaginatedItems = items.slice(startIndex, endIndex);
      setPaginatedItems(initialPaginatedItems);
    }
  }, [items, itemsPerPage, currentPage]);

  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    const startIndex = (newPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    const slicedItems = items.slice(startIndex, endIndex);
    setPaginatedItems(slicedItems);
    setCurrentPage(newPage + 1);
  };

  return (
    <Fragment>
      {items.length > itemsPerPage && (
        <TablePagination
          component="div"
          count={items.length}
          page={currentPage - 1}
          onPageChange={handlePageChange}
          rowsPerPage={itemsPerPage}
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Fragment>
  );
};

export default CustomPagination;
