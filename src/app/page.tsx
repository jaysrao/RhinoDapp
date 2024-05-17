"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";
import ConnectWallet from "@/components/ConnectButton/ConnectWallet";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import SubmitRequestForm from "./SubmitRequestForm";
import GenerateSignatureForm from "./GenerateSignatureForm";

export default function Home() {
  const [formType, setFormType] = useState<boolean>(true);

  const handleFormChange = (e: React.MouseEvent<HTMLElement>) => {
    setFormType(!formType);
  };

  return (
    <>
      <div className={styles.nav}>
        <SubmitButton onClick={handleFormChange}>{formType ? "Full Withdrawal" : "Generate Signature"}</SubmitButton>
        <ConnectWallet />
      </div>

      <div className={styles.main}>
        <div className={styles.card}>{!formType ? <SubmitRequestForm /> : <GenerateSignatureForm />}</div>
      </div>

      <ToastContainer autoClose={2000} />
    </>
  );
}
