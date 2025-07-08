"use client";

import Image from "next/image";

import styles from "@/styles/Block.module.css";

export function ImageBlock() {
  return (
    <Image
      className={styles.image}
      src="https://picsum.photos/300/150"
      alt="Placeholder"
      width={300}
      height={150}
    />
  );
}
