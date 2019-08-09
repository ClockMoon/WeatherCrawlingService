import React, { useState } from "react";
import { PreviousMoveButton, NextMoveButton } from "./MoveButton";
import { Checkbox } from "antd";
import factorInformation from "../util/factorInformation";
import { useDispatch } from "react-redux";
import { selectFactorsAction, selectAllFactorsAction } from "../reducers/card";
const CheckboxGroup = Checkbox.Group;

const factorInformationName = factorInformation.map(value => {
  return value.factor;
});

const FactorSelect = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [chechkAll, setCheckAll] = useState(false);
  const dispatch = useDispatch();
  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? factorInformationName : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    dispatch(
      selectAllFactorsAction({
        allFactors: factorInformationName
      })
    );
  };

  const onCheckChange = checkedList => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < factorInformationName.length
    );
    setCheckAll(checkedList.length === factorInformationName.length);
    dispatch(
      selectFactorsAction({
        factors: checkedList
      })
    );
  };
  return (
    <div className="factorSelectContainer">
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
      <div className="buttonsContainer">
        <PreviousMoveButton />
        <NextMoveButton />
      </div>
    </div>
  );
};

export default FactorSelect;
