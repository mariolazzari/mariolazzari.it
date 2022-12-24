import { useState } from "react";
import PropTypes from "prop-types";
// Mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typogrphy from "@mui/material/Typography";
// components
import DateBox from "components/Pickers/DateBox";
import { Search } from "components/Buttons";

const SearchBox = ({ title, from, to, onSearch, onFromChange, onToChange }) => {
  const styles = {
    paper: {
      padding: 3,
    },
    avatar: {
      height: 100,
      width: 100,
      marginX: "auto",
      marginBottom: 1,
    },
    dates: {
      display: "flex",
      justifyContent: "center",
      marginY: 1,
    },
    date: {
      margin: 1,
    },
    search: {
      display: "flex",
      justifyContent: "center",
      marginY: 1,
    },
  };

  const renderTitle = () => {
    const titles = {
      pods: "Picture of the day",
    };

    return titles[title];
  };

  const onSubmit = e => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Paper
      sx={styles.paper}
      component="form"
      elevation={10}
      onSubmit={onSubmit}
    >
      <Avatar sx={styles.avatar} src="/images/logos/nasa.png" />

      <Typogrphy variant="h6" color="primary" align="center" gutterBottom>
        {renderTitle()}
      </Typogrphy>

      <Box sx={styles.dates}>
        <DateBox
          sx={styles.date}
          label="From"
          value={from}
          onChange={onFromChange}
        />
        <DateBox sx={styles.date} label="To" value={to} onChange={onToChange} />
      </Box>

      <Box sx={styles.search}>
        <Search />
      </Box>
    </Paper>
  );
};

SearchBox.propTypes = {
  title: PropTypes.string.isRequired,
  onSeach: PropTypes.func.isRequired,
};

export default SearchBox;
