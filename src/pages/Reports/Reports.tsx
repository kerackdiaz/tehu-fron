import Panel from "../../components/templates/Panel/Panel";
import { ReportsContainer } from "../ReportsContainer/ReportsContainer";

const Reports: React.FC = () => {
  return (
    <Panel panelComponent={<ReportsContainer />} />
  );
};

export { Reports};