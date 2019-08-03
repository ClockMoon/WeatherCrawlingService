import React, { useState } from "react";
import { PreviousMoveButton, NextMoveButton } from "./MoveButton";
import { Checkbox } from "antd";
import factorInformation from "../util/factorInformation";

const CheckboxGroup = Checkbox.Group;

const factorInformationName = factorInformation.map(value => {
  return value.factor;
});

const FactorSelect = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [chechkAll, setCheckAll] = useState(false);

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? factorInformationName : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onCheckChange = checkedList => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < factorInformationName.length
    );
    setCheckAll(checkedList.length === factorInformationName.length);
  };
  return (
    <div className="factorSelectContainer">
      <PreviousMoveButton />
      <div className="factorContainer">
        <Checkbox
          onChange={onCheckAllChange}
          indeterminate={indeterminate}
          checked={chechkAll}
        >
          모두 선택하기
        </Checkbox>

        <CheckboxGroup
          options={factorInformationName}
          value={checkedList}
          onChange={onCheckChange}
        />
      </div>
      <NextMoveButton />
    </div>
  );
};

export default FactorSelect;
