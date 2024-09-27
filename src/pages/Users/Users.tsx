import Panel from '../../components/templates/Panel/Panel';
import UsersContainer from '../UsersContainer/UsersContainer';

const Users: React.FC = () => {
  return (
    <Panel panelComponent={<UsersContainer />} />
  );
};

export default Users;