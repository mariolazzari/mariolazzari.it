import React from "react";
import PropTypes from "prop-types";
// Mui
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextBox from "components/TextBox";
import Box from "@mui/material/Box";
import { Search, Back } from "components/Buttons";
import PageBox from "components/PageBox";

const SearchBox = ({
  onSubmit,
  value,
  page,
  count,
  onChange,
  onClear,
  onPageChange,
  image,
}) => {
  // styles
  const styles = {
    avatar: {
      marginBottom: 2,
      width: 60,
      height: 60,
    },
    search: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 8,
      marginBottom: 4,
      padding: 2,
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
      marginY: 1,
    },
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <Paper
      sx={styles.search}
      component="form"
      onSubmit={onFormSubmit}
      elevation={10}
    >
      <Avatar
        sx={styles.avatar}
        src={`/images/logos/${image}`}
        alt="Rijksmuseum"
      />

      <TextBox
        name="search"
        label="Cerca"
        value={value}
        onChange={onChange}
        onClear={onClear}
      />
      <Box sx={styles.buttons}>
        <Back variant="outlined" />
        <Search disabled={value === ""} />
      </Box>

      <PageBox count={count} page={page} onChange={onPageChange} />
    </Paper>
  );
};

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  count: PropTypes.number,
  value: PropTypes.string,
  page: PropTypes.number,
  image: PropTypes.string,
};

export default SearchBox;
