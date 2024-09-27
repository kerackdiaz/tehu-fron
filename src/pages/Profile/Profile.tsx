import Panel from '../../components/templates/Panel/Panel';
import ProfileContainer from '../ProfileContainer/ProfileContainer';

const Profile: React.FC = () => {
  return (
    <Panel panelComponent={<ProfileContainer />} />
  );
};

export default Profile;