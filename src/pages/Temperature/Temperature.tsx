import Panel from "../../components/templates/Panel/Panel";
import { TemperatureContainer } from "../TemperatureContainer/TemperatureContainer";

const Temperature: React.FC = () => {
  return (
    <Panel panelComponent={<TemperatureContainer />} />
  );
};

export { Temperature };