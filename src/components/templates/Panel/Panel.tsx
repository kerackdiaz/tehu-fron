import { useMediaQuery } from 'react-responsive';
import AsideBar from '../AsideBar/AsideBar';
import AsideMenuMobile from '../../molecules/AsideMenuMobile/AsideMenuMobile';
import Header from '../../templates/Header/Header';


interface PanelTemplateProps {
  panelComponent: React.ReactNode;
}

const Panel: React.FC<PanelTemplateProps> = ({ panelComponent }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <div className="flex flex-col w-full overflow-auto h-screen lg:flex-row lg:justify-end">
      <div className="lg:fixed lg:left-0 lg:z-20 lg:w-[20%] xl:w-[15%] 2xl:w-[14%]">
        {isDesktop ? <AsideBar /> : <AsideMenuMobile />}
      </div>
      <div className="relative w-full lg:w-[80%] xl:w-[85%] 2xl:w-[86%]">
        {isDesktop && <Header />}
        {panelComponent}
      </div>
    </div>
  );
};

export default Panel;
