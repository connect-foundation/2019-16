import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Range } from "rc-slider";

import "rc-slider/assets/index.css";

const StyleRangeSlider = styled.div`
  display: flex;
  flex-direction: column;
`;

const RangeSlider = ({
  minRange,
  maxRange,
  min_personnel = minRange,
  max_personnel = maxRange,
  step,
  onChangeSlider
}) => {
  const [range, setRange] = useState([minRange, maxRange]);
  const onSliderChange = useCallback(
    r => {
      setRange(r);
      onChangeSlider(...r);
    },
    [onChangeSlider]
  );

  useEffect(() => {
    setRange([min_personnel, max_personnel]);
  }, [min_personnel, max_personnel]);

  return (
    <StyleRangeSlider>
      <div className="slider-output">
        <span> 최소 인원: {range[0]}</span>
        <span> 최대 인원: {range[1]}</span>
      </div>
      <Range
        dots
        min={minRange}
        max={maxRange}
        allowCross={false}
        value={range}
        onChange={onSliderChange}
        step={step}
      />
    </StyleRangeSlider>
  );
};

export default RangeSlider;
