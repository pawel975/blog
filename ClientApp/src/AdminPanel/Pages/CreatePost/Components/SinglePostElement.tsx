import { Button, ButtonGroup, Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import shortenLongString from "../helpers/shortenLongString";
import { IndexedGeneralContentElement } from "../../../../common/types";
import capitalizeWord from "../../../../common/helpers/capitalizeWord";
import { useState } from "react";
import { GoArrowUp as UpIcon, GoArrowDown as DownIcon } from "react-icons/go";

interface SinglePostElementInterface {
  elementProps: IndexedGeneralContentElement;
  id: string;
  handleChangeElementPositionButtonClick: (e: any, direction: "up" | "down") => void;
}

const SinglePostElement: React.FC<SinglePostElementInterface> = ({
  elementProps,
  id,
  handleChangeElementPositionButtonClick,
}) => {
  const { type } = elementProps;
  const [areOptionsOpen, setAreOptionsOpen] = useState<boolean>(false);
  const toggleOptions = () => setAreOptionsOpen(!areOptionsOpen);
  const elementPropsNames = Object.keys(elementProps).filter((name) => name !== "type");

  return (
    <div id={id} className="d-flex align-items-start gap-1">
      <ButtonGroup vertical>
        <Button id={id} onClick={(e) => handleChangeElementPositionButtonClick(e, "up")} className="border">
          <UpIcon style={{ pointerEvents: "none" }} size="1.2rem" />
        </Button>
        <Button id={id} onClick={(e) => handleChangeElementPositionButtonClick(e, "down")} className="border">
          <DownIcon style={{ pointerEvents: "none" }} size="1.2rem" />
        </Button>
      </ButtonGroup>
      <Card className="w-100 p-3 m-auto text-dark">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <strong>Type:</strong> {shortenLongString(type)}
          </h6>
          <Dropdown isOpen={areOptionsOpen} toggle={toggleOptions} direction={"down"}>
            <DropdownToggle className="btn-sm" caret>
              Options
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <hr />
        {elementPropsNames.map((name, index) => {
          const propName = name;
          const propValue = String(elementProps[`${name}`]);
          return (
            <p key={index} className="m-0">
              <strong>{capitalizeWord(propName)}</strong>: {shortenLongString(propValue)}
            </p>
          );
        })}
      </Card>
    </div>
  );
};

export default SinglePostElement;
