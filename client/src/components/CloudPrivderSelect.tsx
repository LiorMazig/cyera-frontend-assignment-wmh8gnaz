import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CLOUD_PROVIDERS_LABEL } from '../constants';
import { SelectOption } from '../types/select';
import { getSelectedProvidersLabel } from '../utils/cloud-providers';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SelectProps {
  options?: SelectOption[];
  onChange?: (values: string[]) => void;
  selectedOptions?: string[];
}

export const CloudPrivderSelect = ({
  options = [],
  onChange,
  selectedOptions = [],
}: SelectProps) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onChange?.(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div className={'select'}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="cloud-providers-label" shrink sx={{ color: 'white' }}>
          {CLOUD_PROVIDERS_LABEL}
        </InputLabel>
        <Select
          style={{ color: 'white' }}
          labelId="cloud-providers-label"
          id="cloud-providers"
          multiple
          displayEmpty
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput notched label={CLOUD_PROVIDERS_LABEL} />}
          renderValue={(selected) => getSelectedProvidersLabel(selected, options)}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={selectedOptions.includes(option.value)} />
              <ListItemText primary={option.displayName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
