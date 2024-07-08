import styles from "./Legend.module.css";
interface ChartBoxProps {
  colors: any;
}
const Legend = (props: ChartBoxProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.legendTitle}>Legend</p>
      <div className={styles.legend}>
        {Object.keys(props.colors)?.map((key:any) => (
          <div className={styles.keyItem}>
            <div
              style={{
                height: 20,
                width: 20,
                background: props.colors[key],
                borderRadius: 5,
              }}
            ></div>
            <p
              style={{
                fontSize: 13,
                color: "#404040",
                margin:0,
              }}
            >
              {key}
            </p>
          </div>
        ))}
        </div>
    </div>
  );
};

export default Legend;
