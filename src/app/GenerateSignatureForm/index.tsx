import React, { useEffect, useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { IconButton } from "@mui/material";
import { Check, ContentCopy } from "@mui/icons-material";
import styles from "./styles.module.css";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import TextInput from "@/components/TextInput/TextInput";
import generate from "./signatureGenerator";

export default function GenerateSignatureForm() {
  const [starkKey, setStarkKey] = useState<string>("");
  const [ethAddress, setEthAddress] = useState<string>("");
  const [starkPrivateKey, setstarkPrivateKey] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isBtnEnabled, setIsBtnEnabled] = useState<boolean>(false);

  const { status } = useAccount();
  const { data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    setIsBtnEnabled(!!starkKey && !!ethAddress && !!starkPrivateKey);
  }, [starkKey, ethAddress, starkPrivateKey]);

  const handleGenerate = (e: React.MouseEvent<HTMLElement>) => {
    setSignature(generate(ethAddress, starkPrivateKey))
  };

  const handleCopy = (e: React.MouseEvent<HTMLElement>) => {
    setIsCopied(true);
    navigator.clipboard.writeText(signature);
  };

  return (
    <>
      <TextInput
        value={starkKey}
        label={"Stark Key"}
        placeholder={"Enter stark key"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStarkKey(e.target.value)}
      />
      <TextInput
        value={ethAddress}
        label={"ETH Address"}
        placeholder={"Enter ETH Address"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEthAddress(e.target.value)}
      />
      <TextInput
        value={starkPrivateKey}
        label={"Stark Private Key"}
        placeholder={"Enter stark private key"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setstarkPrivateKey(e.target.value)}
      />
      <SubmitButton disabled={!isBtnEnabled || status !== "connected"} onClick={handleGenerate} sx={{ ml: "auto" }}>
        {status === "connected"
          ? isConfirming
            ? "Waiting for confirmation..."
            : "Generate Signature"
          : status === "connecting"
          ? "Connecting"
          : "Connect Wallet"}
      </SubmitButton>
      <div className={styles.signature}>
        <TextInput
          value={signature}
          label={"Stark Signature"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignature(e.target.value)}
          sx={{ width: "510px" }}
          rows={5}
          multiline
        />
        <div>
          <IconButton onClick={handleCopy} disabled={!signature}>
            {isCopied ? <Check color="primary" /> : <ContentCopy />}
          </IconButton>
        </div>
      </div>
    </>
  );
}
