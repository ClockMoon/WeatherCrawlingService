import React from "react";
import { PreviousMoveButton, NextMoveButton } from "./MoveButton";
import locationInformation from "../util/locationInformation";
import { useDispatch, useSelector } from "react-redux";
import { selectLocationAction } from "../reducers/card";
const LocationSelect = () => {
  return (
    <div className="locationSelectContainer">
      <PreviousMoveButton />
      <div className="locationContainer">
        <div>
          <Location
            locationInformation={locationInformation}
            startIndex={0}
            endIndex={20}
            key={1}
          />
        </div>
        <div>
          <Location
            locationInformation={locationInformation}
            startIndex={20}
            endIndex={40}
            key={2}
          />
        </div>
        <div>
          <Location
            locationInformation={locationInformation}
            startIndex={40}
            endIndex={60}
            key={3}
          />
        </div>
        <div>
          <Location
            locationInformation={locationInformation}
            startIndex={60}
            endIndex={80}
            key={4}
          />
        </div>
        <div>
          <Location
            locationInformation={locationInformation}
            startIndex={80}
            endIndex={100}
            key={5}
          />
        </div>
      </div>
      <NextMoveButton />
    </div>
  );
};

const Location = props => {
  const dispatch = useDispatch();
  const selectedLocation = useSelector(state => state.card.location);
  const selectTarget = e => {
    const location = e.target.innerHTML;
    dispatch(selectLocationAction({ location }));
  };
  return (
    <>
      {props.locationInformation
        .filter((target, index) => {
          return props.startIndex <= index && index < props.endIndex;
        })
        .map(target => {
          return (
            <>
              {selectedLocation === target.location ? (
                <div
                  value={target.location}
                  onClick={selectTarget}
                  key={target.code}
                  className="location selectedLocation"
                >
                  {target.location}
                </div>
              ) : (
                <div
                  value={target.location}
                  onClick={selectTarget}
                  key={target.code}
                  className="location colorFont"
                >
                  {target.location}
                </div>
              )}
            </>
          );
        })}
    </>
  );
};
export default LocationSelect;
