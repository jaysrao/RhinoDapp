import React, { useEffect, useState } from "react";
import { Address, ContractFunctionRevertedError, toHex } from "viem";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { WriteContractErrorType } from "wagmi/actions";
import { toast } from "react-toastify";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import TextInput from "@/components/TextInput/TextInput";
import FunctionSelect from "@/components/FunctionSelect/FunctionSelect";
import registerSenderABI from "@/constants/ABIs/registerSender.json";
import withdrawABI from "@/constants/ABIs/withdraw.json";
import fullWithdrawalRequestABI from "@/constants/ABIs/fullWithdrawalRequest.json";

export default function SubmitRequestForm() {
  const [address, setAddress] = useState<Address>("0x5d22045DAcEAB03B158031eCB7D9d06Fad24609b");
  const [error, setError] = useState<string>("");
  const [func, setFunc] = useState<string>("");
  const [vaultID, setValutID] = useState<string>("");
  const [isVaultIDEnabled, setIsValutIDEnabled] = useState<boolean>(true);
  const [assetType, setAssetType] = useState<string>("");
  const [isAssetTypeEnabled, setIsAssetTypeEnabled] = useState<boolean>(true);
  const [starkKey, setStarkKey] = useState<string>("");
  const [isStarkKeyEnabled, setIsStarkKeyEnabled] = useState<boolean>(true);
  const [starkSignature, setStarkSignature] = useState<string>("");
  const [isStarkSignatureEnabled, setIsStarkSignatureEnabled] = useState<boolean>(true);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);

  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const { status } = useAccount();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (!address.match(/^0x[A-Fa-f0-9]+$/)) {
      setIsSubmitEnabled(false);
      return;
    }
    switch (func) {
      case "registerSender":
        setIsSubmitEnabled(!!starkKey && !!starkSignature);
        break;
      case "fullWithdrawalRequest":
        setIsSubmitEnabled(!!vaultID && !!starkKey);
        break;
      case "withdraw":
        setIsSubmitEnabled(!!assetType && !!starkKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, vaultID, assetType, starkKey, starkSignature]);

  useEffect(() => {
    switch (func) {
      case "registerSender":
        setIsValutIDEnabled(false);
        setIsAssetTypeEnabled(false);
        setIsStarkKeyEnabled(true);
        setIsStarkSignatureEnabled(true);
        break;
      case "fullWithdrawalRequest":
        setIsValutIDEnabled(true);
        setIsAssetTypeEnabled(false);
        setIsStarkKeyEnabled(true);
        setIsStarkSignatureEnabled(false);
        break;
      case "withdraw":
        setIsValutIDEnabled(false);
        setIsAssetTypeEnabled(true);
        setIsStarkKeyEnabled(true);
        setIsStarkSignatureEnabled(false);
    }

    setValutID("");
    setAssetType("");
    setStarkKey("");
    setStarkSignature("");
  }, [func]);

  useEffect(() => {
    if (isConfirmed) toast.success("Transaction confirmed.");
  }, [isConfirmed]);

  const onSubmit = async () => {
    try {
      switch (func) {
        case "registerSender":
          await writeContractAsync(
            {
              address: address,
              abi: registerSenderABI,
              functionName: "registerSender",
              args: [BigInt(starkKey), starkSignature],
            },
            {
              onError: (error: WriteContractErrorType, _, __) => {
                if (error as ContractFunctionRevertedError) {
                  toast.error((error as any).shortMessage);
                } else {
                  toast.error("The `registerSender` transaction is failed.");
                }
              },
            }
          );
          break;
        case "fullWithdrawalRequest":
          await writeContractAsync(
            {
              address: address,
              abi: fullWithdrawalRequestABI,
              functionName: "fullWithdrawalRequest",
              args: [BigInt(starkKey), BigInt(vaultID)],
            },
            {
              onError: (error: WriteContractErrorType, _, __) => {
                if (error as ContractFunctionRevertedError) {
                  toast.error((error as any).shortMessage);
                } else {
                  toast.error("The `fullWithdrawalRequest` transaction is failed.");
                }
              },
            }
          );
          break;
        case "withdraw":
          await writeContractAsync(
            {
              address: address,
              abi: withdrawABI,
              functionName: "withdraw",
              args: [BigInt(starkKey), BigInt(assetType)],
            },
            {
              onError: (error: WriteContractErrorType, _, __) => {
                if (error as ContractFunctionRevertedError) {
                  toast.error((error as any).shortMessage);
                } else {
                  toast.error("The `withdraw` transaction is failed.");
                }
              },
            }
          );
      }
    } catch (e) {
      console.log(e);
    }

    setValutID("");
    setAssetType("");
    setStarkKey("");
    setStarkSignature("");
  };

  return (
    <>
      <TextInput
        value={address}
        label={"Contract Address"}
        onChange={(e: any) => {
          const _value = e.target.value;
          if (typeof _value === "string" && _value.match(/^0x[A-Fa-f0-9]+$/)) {
            setError("");
          } else {
            setError('Address should be started with "0x".');
          }
          setAddress(e.target.value as `0x${string}`);
        }}
        error={!!error}
      />
      <FunctionSelect value={func} onChange={(e: any) => setFunc(e.target.value)} />
      <TextInput
        value={starkKey}
        label={"Stark Key"}
        placeholder={"Enter stark key"}
        disabled={!isStarkKeyEnabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStarkKey(e.target.value)}
      />
      <TextInput
        value={starkSignature}
        label={"Stark Signature"}
        placeholder={"Enter stark signature"}
        disabled={!isStarkSignatureEnabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStarkSignature(e.target.value)}
      />
      <TextInput
        value={vaultID}
        label={"Vault ID"}
        placeholder={"Enter valut ID"}
        disabled={!isVaultIDEnabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValutID(e.target.value)}
      />
      <TextInput
        value={assetType}
        label={"Asset Type"}
        placeholder={"Enter asset type"}
        disabled={!isAssetTypeEnabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssetType(e.target.value)}
      />
      <SubmitButton disabled={!isSubmitEnabled || status !== "connected"} onClick={onSubmit} sx={{ ml: "auto" }}>
        {status === "connected"
          ? isConfirming
            ? "Waiting for confirmation..."
            : "Submit Transaction"
          : status === "connecting"
          ? "Connecting"
          : "Connect Wallet"}
      </SubmitButton>
    </>
  );
}
