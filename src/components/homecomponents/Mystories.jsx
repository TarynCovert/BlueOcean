import React, { useEffect } from 'react';
import { Checkbox } from '@material-tailwind/react';

export default function Mystories({
  myStoriesFilter, showCheck, setMyStoriesFilter, isChecked, setIsChecked,
}) {
  const clickHandler = () => {
    isChecked ? setIsChecked(false) : setIsChecked(true); // Toggle the isChecked state
  };

  useEffect(() => {
    setMyStoriesFilter(isChecked);
  }, [isChecked, setMyStoriesFilter]);

  return (
    <Checkbox
      label="My Character Stories"
      color="indigo"
      disabled={showCheck}
      checked={isChecked}
      onChange={clickHandler}
      className="font-arial"
      style={{ backgroundColor: isChecked ? '#101A4B  ' : 'white', border: isChecked ? 'none' : '' }}
    />
  );
}
