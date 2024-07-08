import styles from "./LoadingPage.module.css";
import ReactLoading from "react-loading";

const LoadingPage = () => {

  return (
    <div className={styles.container}>
            <ReactLoading type="spin" color="#0000FF"
                height={150} width={50} />
    </div>
  );
};

export default LoadingPage;
