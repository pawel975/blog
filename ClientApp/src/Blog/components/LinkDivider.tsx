type DividerColor = "primary" | "secondary" | "light";

interface LinkDividerInterface {
  dividerColor: DividerColor;
}

const LinkDivider: React.FC<LinkDividerInterface> = ({ dividerColor }) => {
  switch (dividerColor) {
    case "primary":
      return <div className="own-border-primary w-100"></div>;
    case "secondary":
      return <div className="own-border-secondary w-100"></div>;
    case "light":
      return <div className="own-border-light w-100"></div>;
  }
};

export default LinkDivider;
