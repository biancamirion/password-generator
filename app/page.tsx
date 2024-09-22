"use client";
import styles from "./page.module.scss";
import { PasswordGenerator } from "../src/components/PasswordGenerator";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.centerContainer}>
        <PasswordGenerator />
      </div>
    </div>
  );
}
