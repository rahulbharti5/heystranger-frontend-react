import styles from "./styles/Features.module.css";
const Feature = ({ title, description, icon }) => {
  return (
    <div className={styles.featureWrapper}>
      <img src={icon} />
      <div className={styles.featureContent}>
        <h1 className={styles.featureHeading}>{title}</h1>
        <p className={styles.featurText}>{description}</p>
      </div>
    </div>
  );
};

export default Feature;
