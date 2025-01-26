import { Triangle } from "react-loader-spinner";
import styles from "../../styles/loader/Loader.module.css";

const Loader = () => (
  <div className={styles.loaderOverlay}>
    <div className={styles.loaderWrapper}>
      <Triangle
        visible={true}
        height={window.innerWidth < 768 ? 60 : 100}
        width={window.innerWidth < 768 ? 60 : 100}
        color="#4fa94d"
        ariaLabel="triangle-loading"
      />
    </div>
  </div>
);

export default Loader;
