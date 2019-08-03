import React, { useState } from "react";
import { DatePicker } from "antd";
import {
  PreviousMoveButton,
  NextMoveButton,
  SubmitCardButton
} from "./MoveButton";
const { RangePicker } = DatePicker;

const YearSelect = () => {
  const [mode, setMode] = useState(["month", "month"]);
  const [yearValue, setYearValue] = useState([]);

  const onPanelChange = (yearValue, mode) => {
    setMode([
      mode[0] === "date" ? "month" : mode[0],
      mode[1] === " date" ? "month" : mode[1]
    ]);
    setYearValue(yearValue);
  };

  const onYearChange = yearValue => {
    setYearValue(yearValue);
  };

  return (
    <div className="yearSelectContainer">
      <PreviousMoveButton />
      <div className="yearContainer">
        <RangePicker
          placeholder={["시작 년도", "마지막 년도"]}
          format="YYYY-MM"
          value={yearValue}
          mode={mode}
          onChange={onYearChange}
          onPanelChange={onPanelChange}
        />
      </div>
      <SubmitCardButton />
    </div>
  );
};

export default YearSelect;
