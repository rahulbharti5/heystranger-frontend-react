import Feature from "./Feature";
import styles from "./styles/Features.module.css";

const features = [
  {
    title: "Instant Connections",
    description:
      "Start a conversation with a new college student in seconds. No need to wait—just tap, match, and chat with someone new instantly.",
    image: "Vector1.svg",
  },
  {
    title: "Video Chat",
    description:
      "Connect with your new college friends through video chat. Share your experiences and make new memories together.",
    image: "Vector2.svg",
  },
  {
    title: "Stay Connected",
    description:
      "Keep in touch with your new friends. Share your social media profiles and stay connected with them.",
    image: "Vector3.svg",
  },
];

const Features = () => {
  return (
    <div className={styles.featuresWrapper}>
      <h1 className={styles.featuresHeading}>Features</h1>
      {features.map((feature, index) => (
        <Feature
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.image}
        />
      ))}
    </div>
  );
};

export default Features;
