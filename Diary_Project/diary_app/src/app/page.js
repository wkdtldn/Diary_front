import styles from "./page.module.css";
import Image from "next/image";
import diaryImage from "../../public/image/first_page.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.title}>Diary</div>
      <div className={styles.detail}>
        <span>그날 그날의</span>
        <br />
        <span>기록하고 분석하는</span>
      </div>
      <div className={styles.imgWrapper}>
        <Image src={diaryImage} alt="diary_img" />
      </div>
      <Link href={{ pathname: "/pages/login" }}>
        <button className={styles.btnStart}>클릭하여 시작</button>
      </Link>
    </div>
  );
}
