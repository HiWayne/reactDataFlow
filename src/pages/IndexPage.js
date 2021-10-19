import { Link } from 'react-router-dom';
import routes from 'router/routes';
import * as Styles from 'styles/index';

const IndexPage = () => {
  return (
    <div className="w-100vw h-100vh flex justify-around items-center bg-gradient-to-r from-blue-50 to-blue-100">
      {routes
        .filter((route) => route.path !== '/')
        .map((route) => (
          <Link to={{ pathname: route.path }} key={route.path + route.meta.title || ''}>
            <div
              className={`px-1 py-0.5 ${Styles.hoverShadow} rounded-sm text-lg ${Styles.transition} bg-blue-300 hover:text-blue-300 hover:bg-white text-white`}
            >
              {route.meta.title}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
