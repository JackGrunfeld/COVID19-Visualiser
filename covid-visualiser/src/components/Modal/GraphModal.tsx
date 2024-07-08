import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { Box, Modal, Typography } from "@mui/material";
import ChartBox from '../ChartBox/ChartBox';
import AreaChartBox from "../AreaChartBox/AreaChartBox";
import BarChartBox from "../BarChartBox/BarChartBox";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: "5px",
  boxShadow: 24,
  height:"600px",
  pt: 2,
  px: 4,
  pb: 3,
  
};


export type ChartProps = {
  countries: any[];
  selectedMetric: string;
  colors: any[];
  chartType: 'AreaChart' | 'Chart' | 'BarChart';
}


interface ModalProps {
    open: ChartProps | undefined;
    setIsOpen: any;
}

const GraphModal = (props :ModalProps) => {
  let ChartComponent;
  if (props.open?.chartType === 'AreaChart') {
    ChartComponent = AreaChartBox;
  } else if (props.open?.chartType === 'Chart') {
    ChartComponent = ChartBox;
  } else {
    ChartComponent = BarChartBox;
  }

  return (
    <Modal
      open={!!props.open}
      onClose={() => props.setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <Box sx={style}>
        {props.open && (
          <ChartComponent
            countries={props.open.countries}
            selectedMetric={props.open.selectedMetric}
            colors={props.open.colors}
            height={500}
            width={900}
            legend={true}
            disableDropShadow={true}
          />
        )}
      </Box>
    </Modal>
  );
};

export default GraphModal;