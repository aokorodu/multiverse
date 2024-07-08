import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

export const ZoomButton = () => {
  const [zoom, setZoom] = useState(true);
  return (
    <IconButton
      onClick={(e) => {
        setZoom(!zoom);
      }}
    >
      {zoom ? <ZoomInIcon /> : <ZoomOutIcon />}
    </IconButton>
  );
};
