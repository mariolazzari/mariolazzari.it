import Pagination from "@mui/material/Pagination";

const PageBox = props => {
  const style = {
    pager: {
      margin: 1,
    },
  };

  const onChange = (_, page) => {
    props.onChange?.(page);
  };

  return (
    <Pagination
      sx={style.pager}
      count={props.count}
      color={props.color}
      onChange={onChange}
    />
  );
};

PageBox.defaultProps = {
  count: 10,
  color: "primary",
  onChange: null,
};

export default PageBox;
