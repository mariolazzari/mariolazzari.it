// Mui
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const Speed = ({ items }) => {
  const styles = {
    speed: {
      position: "absolute",
      bottom: 4,
      right: 4,
    },
  };

  return (
    <SpeedDial sx={styles.speed} icon={<SpeedDialIcon />} ariaLabel="Options">
      {items?.map(({ name, icon, onClick }) => (
        <SpeedDialAction
          key={name}
          icon={icon}
          tooltipTitle={name}
          onClick={onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default Speed;
