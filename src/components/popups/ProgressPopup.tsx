import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "../../styles/Popup.css";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {`${Math.round(props.value)}%`}
      </Box>
    </Box>
  );
}

function ProgressPopup(props: any) {
  return (
    <React.Fragment>
      <div className="popup" style={{ display: props.display, zIndex: 2 }}>
        <CircularProgressWithLabel value={props.progress} />
      </div>
    </React.Fragment>
  );
}

export default ProgressPopup;
