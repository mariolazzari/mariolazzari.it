import Backdrop from "@mui/material/Backdrop";
import Circular from "@mui/material/CircularProgress";

const BackDrop = ({ open }) => {
  return (
    <Backdrop open={open}>
      <Circular />
    </Backdrop>
  );
};

BackDrop.defaultProps = {
  open: false,
};

export default BackDrop;
