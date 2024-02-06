type DividerColor = "primary" | "secondary" | "light";

interface LinkDividerInterface {
  dividerColor: DividerColor;
}

const HrDivider: React.FC<LinkDividerInterface> = ({ dividerColor }) => {
  return <div className={`own-border-${dividerColor}`}></div>;
};

export default HrDivider;
