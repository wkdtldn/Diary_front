import styles from "./page.module.css";
import Link from "next/link";

export default function date() {
  return (
    <div className={styles.dateWrapper}>
      <span className={styles.year}>2024년</span>
      <br />
      <div className={styles.MonthSelectWrapper}>
        <select className={styles.monthSelector}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <span>월</span>
      </div>
      <div>
        <Link href={{ pathname: "/pages/calendar" }}>
          <button>Enter</button>
        </Link>
      </div>
    </div>
  );
}
