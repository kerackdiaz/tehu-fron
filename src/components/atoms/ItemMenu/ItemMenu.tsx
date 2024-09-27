interface AppProps {
  text: string;
  icon: string;
  link: string;
}

const ItemMenu = ({ icon, text, link}: AppProps) => {

  const goToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log('E', e);
    const target = e.target as HTMLAnchorElement;
    target.classList.add('active');
  };
  
  return (
    <a onClick={(e) => goToMenu(e)} className='px-4 flex items-center py-2 gap-6 hover:bg-blueHover rounded-xl' href={link}>
      <img className='size-5' src={icon} alt={text} />
      <span className='text-whiteLight'>{text}</span>
    </a>
  );
};

export default ItemMenu;
