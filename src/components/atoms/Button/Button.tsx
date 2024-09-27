import { Link } from "react-router-dom";

interface AppProps {
  text: string;
  route: string;
  className: string;
}

const Button = ({ text, route, className }: AppProps) => {
  return (
    <>
      <Link to={route}>
        <button className={`${className} flex items-center justify-center rounded-full font-semibold text-center text-lg w-[250px] cursor-pointer`}>{text}</button>
      </Link>
    </>
  );
};

export default Button;