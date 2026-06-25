"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scanTicketAction } from "../actions";
import { useScanStore } from "../store/scanStore";
import type { ScanResult } from "../types";

export function QRScanner() {
  const [code, setCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const { lastResult, setLastResult } = useScanStore();

  const handleScan = async () => {
    if (!code.trim()) return;
    setScanning(true);
    const res = await scanTicketAction(code.trim());
    if (res.success && res.data) {
      setLastResult(res.data as ScanResult);
    }
    setCode("");
    setScanning(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Scan or enter ticket code"
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
          autoFocus
        />
        <Button onClick={handleScan} disabled={scanning || !code.trim()}>
          {scanning ? "Scanning…" : "Scan"}
        </Button>
      </div>

      {lastResult && (
        <div
          className={`rounded-lg border p-4 ${
            lastResult.valid
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50"
          }`}
        >
          <p className="font-semibold">
            {lastResult.valid ? "✓ Valid ticket" : "✗ Invalid ticket"}
          </p>
          <p className="text-sm text-muted-foreground">{lastResult.message}</p>
          {lastResult.participantName && (
            <p className="text-sm">{lastResult.participantName}</p>
          )}
        </div>
      )}
    </div>
  );
}
