import { Link } from 'react-router-dom';

const Logo = ({ width = '100px', height = 'auto' }) => {
    return (
        <div className='m-auto' style={{ width, height }}>
            <Link to={'/'}>
                <img
                    className='w-full h-full object-contain'
                    src={"./logo.avif"}
                    loading="lazy"
                    alt='Tehu System'
                    title='Tehu System'
                    style={{ width: '100%', height: '100%' }}
                />
            </Link>
        </div>
    );
};

export default Logo;