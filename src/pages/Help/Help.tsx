import Panel from '../../components/templates/Panel/Panel';
import HelpContainer from '../HelpContainer/HelpContainer';

const Help: React.FC = () => {
  return (
    <Panel panelComponent={<HelpContainer />} />
  );
};

export default Help;