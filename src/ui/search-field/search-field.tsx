import { useEffect, useRef, useState } from 'react';

import { debounce } from 'lodash';

import { CircularProgress, InputAdornment, TextField } from '@mui/material';

type SearchFieldProps = {
  value: string;
  onChange?: (newValue: string) => void;
  loading?: boolean;
};

const SearchField = ({
  value,
  onChange = () => {},
  loading,
}: SearchFieldProps) => {
  const [fieldValue, setFieldValue] = useState(value);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const debouncedHandleChange = useRef(
    debounce(onChange, 700, { maxWait: 2000 })
  );

  return (
    <TextField
      value={fieldValue}
      aria-label="Search movies"
      placeholder="Search movies"
      onChange={(e) => {
        setFieldValue(e.target.value);
        debouncedHandleChange.current(e.target.value);
      }}
      variant="outlined"
      fullWidth
      inputProps={{ 'data-testid': 'search-field' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start" sx={{ marginRight: 2 }}>
            {loading && <CircularProgress size={20} />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
