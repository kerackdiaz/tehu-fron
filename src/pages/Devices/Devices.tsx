import Panel from '../../components/templates/Panel/Panel';
import DevicesContainer from '../DevicesContainer/DevicesContainer';

const Devices: React.FC = () => {
  return (
    <Panel panelComponent={<DevicesContainer />} />
  );
};

export default Devices;