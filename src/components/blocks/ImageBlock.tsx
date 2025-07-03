"use client";

import Image from "next/image";
import styles from "./Block.module.css";

export function ImageBlock() {
  return (
    <Image
      className={styles.image}
      src="https://via.placeholder.com/300x150"
      alt="Placeholder"
      width={300}
      height={150}
    />
  );
}
