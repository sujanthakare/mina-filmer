import React, { useEffect, useRef, useState } from 'react';

import _ from 'lodash';

import { TextField } from '@mui/material';

type SearchFieldProps = {
  value: string;
  onChange?: (newValue: string) => void;
};

const SearchField = ({ value, onChange = () => {} }: SearchFieldProps) => {
  const [fieldValue, setFieldValue] = useState(value);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const debouncedHandleChange = useRef(
    _.debounce(onChange, 700, { maxWait: 2000 })
  );

  return (
    <TextField
      value={fieldValue}
      placeholder="Search movies"
      onChange={(e) => {
        setFieldValue(e.target.value);
        debouncedHandleChange.current(e.target.value);
      }}
      variant="outlined"
      fullWidth
    />
  );
};

export default SearchField;
