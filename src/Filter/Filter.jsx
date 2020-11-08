import React from "react";
import PropTypes from "prop-types";


export default function Filter({ filterHandler }) {
  return (
    <>
      <p>Find contacts by name</p>
      <input
        type="text"
        placeholder="Input name"
        name="filter"
        onChange={filterHandler}
      />
    </>
  );
}

Filter.defaultProps = {
  filterHandler: () => {
    return;
  },
}

Filter.propTypes = {
  filterHandler: PropTypes.func.isRequired,
}