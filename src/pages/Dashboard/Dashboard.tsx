
import Panel from '../../components/templates/Panel/Panel';
import DashboardContainer from '../DashnoardContainer/DashboardContainer';

const  Dashboard: React.FC = () => {
  return (
    <Panel panelComponent={<DashboardContainer />} />
  );
};

export default Dashboard;