import { Spinner, SpinnerProps } from "reactstrap";

type SpinnerSize = 0.875 | 1 | 2 | 3 | 4 | 5 | 6;

interface SpinnerInterface extends SpinnerProps {
  sizeRem: SpinnerSize;
}

const CustomSpinner: React.FC<SpinnerInterface> = ({ sizeRem = 2 }) => {
  const REM = "rem";
  const fontSizeResizer = 0.5;

  const customSpinnerStyles: React.CSSProperties = {
    width: String(sizeRem) + REM,
    height: String(sizeRem) + REM,
    fontSize: sizeRem * fontSizeResizer + REM,
  };
  return <Spinner style={customSpinnerStyles} />;
};

export default CustomSpinner;
