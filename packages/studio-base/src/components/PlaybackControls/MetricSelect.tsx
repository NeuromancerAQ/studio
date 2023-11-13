import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  button: {
    padding: theme.spacing(0.625, 0.5),
    backgroundColor: "transparent",

    ":hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default function MetricSelect (props): JSX.Element {
  const { rangeType, handleMetricRange, selectName } = props
  const [metric, setMetric] = useState('');

  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = useState<undefined | HTMLElement>(undefined);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  useEffect(()=> {
    setMetric(selectName)
  }, [selectName])

  return (
    <>
      <Button
        className={classes.button}
        id="playback-speed-button"
        aria-controls={open ? "playback-speed-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        data-testid="PlaybackSpeedControls-Dropdown"
        disableRipple
        variant="contained"
        color="inherit"
        endIcon={<ArrowDropDownIcon />}
      >
        {metric}
      </Button>
      <Menu
        id="playback-speed-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "playback-speed-button",
          dense: true,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {rangeType.map((option) => (
          <MenuItem
            selected={metric === option.metric}
            key={option.metric}
            onClick={() => {
              setMetric(option.metric);
              handleMetricRange(option.ranges);
              handleClose();
            }}
          >
            {metric === option.metric && (
              <ListItemIcon>
                <CheckIcon fontSize="small" />
              </ListItemIcon>
            )}
            <ListItemText
              inset={metric !== option.metric}
              primary={option.metric}
              primaryTypographyProps={{ variant: "inherit" }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
