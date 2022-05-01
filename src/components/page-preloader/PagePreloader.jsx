import { ReactComponent as Preloader } from "./preloader.svg";

import "./page-preloader.css";

const PagePreloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className="preloader__body">
          <Preloader />
          <div className="preloader__title">Mint token...</div>
        </div>
      </div>
    </div>
  );
};

export default PagePreloader;
