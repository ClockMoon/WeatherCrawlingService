import React, { useState } from "react";
import { DatePicker } from "antd";
import { PreviousMoveButton, SubmitCardButton } from "./MoveButton";
import { useDispatch } from "react-redux";
import { selectStartYearAction, selectEndYearAction } from "../reducers/card";

const { RangePicker } = DatePicker;

const YearSelect = () => {
  const [mode, setMode] = useState(["month", "month"]);
  const [yearValue, setYearValue] = useState([]);
  const dispatch = useDispatch();
  const onPanelChange = (yearValue, mode) => {
    setMode([
      mode[0] === "date" ? "month" : mode[0],
      mode[1] === " date" ? "month" : mode[1]
    ]);
    setYearValue(yearValue);
    dispatch(
      selectStartYearAction({
        startYear: yearValue[0].format("YYYY")
      })
    );
    dispatch(
      selectEndYearAction({
        endYear: yearValue[1].format("YYYY")
      })
    );
  };

  const onYearChange = yearValue => {
    setYearValue(yearValue);
    dispatch(
      selectStartYearAction({
        startYear: yearValue[0].format("YYYY")
      })
    );
    dispatch(
      selectEndYearAction({
        endYear: yearValue[1].format("YYYY")
      })
    );
  };

  return (
    <div className="yearSelectContainer">
      <div className="yearContainerContainer">
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
      </div>
      <div className="buttonsContainer">
        <PreviousMoveButton />
        <SubmitCardButton />
      </div>
    </div>
  );
};

export default YearSelect;
