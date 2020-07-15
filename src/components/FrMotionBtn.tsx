import React from "react";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

interface IFMBProps {
  children: React.ReactNode;
  click: () => void;
}
const FrMotionBtn = ({ children, click, ...other }: IFMBProps) => {
  const btnVariants = {
    hover: { scale: 1.05, originX: 0 },
    tap: { scale: 1 },
    transition: {
      type: "spring",
      stiffness: 200,
    },
  };
  return (
    <motion.div variants={btnVariants} whileHover="hover" whileTap="tap">
      <Button
        onClick={click}
        {...other}
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default FrMotionBtn;
