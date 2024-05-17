"use client";
import React from "react";
import { Button } from "@mui/material";
import { Wallet } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const MuiButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
  padding: "0.5rem 1.5rem",
  fontSize: 16,
  fontWeight: "bold",
  borderRadius: "0.5rem",
  textTransform: "none",
}));

export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <MuiButton variant="contained" color="warning" onClick={openConnectModal} startIcon={<Wallet />}>
                    Connect Wallet
                  </MuiButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <MuiButton variant="contained" color="warning" onClick={openChainModal} startIcon={<Wallet />}>
                    Wrong network
                  </MuiButton>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <MuiButton variant="contained" color="warning" onClick={openAccountModal} startIcon={<Wallet />}>
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ""}
                  </MuiButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
