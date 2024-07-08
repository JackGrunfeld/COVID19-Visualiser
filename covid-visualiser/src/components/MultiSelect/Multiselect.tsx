import styles from "./Multiselect.module.css";
import { MenuItem, Autocomplete, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

interface MultiSelectProps {
  title: string;
  names: string[];
  selectedNames: string[];
  setSelectedNames: any;
}

const style = {
  marginBottom: 2,
  paddingTop: 2.2,
  paddingBottom: 0,
  backgroundColor: "#fff",
  borderRadius: "15px",
  borderColor: "transparent",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
};

const MultiSelect = (props: MultiSelectProps) => {
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;

    props.setSelectedNames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(props.selectedNames);
  };

  if (!props.names) return null;

  return (
    <Autocomplete
      sx={style}
      multiple
      id="tags-outlined"
      options={props.names}
      getOptionLabel={(option) => option}
      defaultValue={props.selectedNames}
      disableCloseOnSelect
      onChange={(event, value) => props.setSelectedNames(value)}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          key={option}
          value={option}
          sx={{ justifyContent: "space-between" }}
          {...props}
          onChange={handleChange}
        >
          {option}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={props.title}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
            },
            "& input": {
              fontSize: "smaller",
            },
          }}
        />
      )}
    />
  );
};

export default MultiSelect;
