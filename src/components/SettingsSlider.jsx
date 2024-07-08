import { Slider } from "@mui/material";

export const SettingsSlider = ({ label, val, min, max, callback }) => {
  return (
    <>
      <div className="sliderContainer">
        <Slider
          aria-label="number of reflections"
          defaultValue={val}
          step={1}
          marks
          min={min}
          max={max}
          valueLabelDisplay="auto"
          onChange={(e) => {
            const val = e.target.value;
            callback(val);
          }}
        />
        <div>
          {label}: {val}
        </div>
      </div>
    </>
  );
};
