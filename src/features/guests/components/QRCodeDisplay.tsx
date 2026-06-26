"use client";

import { useCallback, useEffect, useState } from "react";
import type { GuestQRCode } from "../types";

interface Props {
  qrCodes: GuestQRCode[];
}

function QrBlock({ label, payload }: { label: string; payload: string }) {
  const [svg, setSvg] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      QRCode.toString(payload, { type: "svg", margin: 1, width: 200 }, (err, svgStr) => {
        if (!cancelled && !err) setSvg(svgStr);
      });
    });
    return () => { cancelled = true; };
  }, [payload]);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${label.replace(/\s+/g, "-").toLowerCase()}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }, [svg, label]);

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-5">
      <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-white p-2">
        {svg ? (
          <div
            className="h-full w-full [&_svg]:h-full [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted-foreground/20" />
        )}
      </div>
      <p className="text-center text-xs font-medium text-muted-foreground">{label}</p>
      <button
        onClick={handleDownload}
        disabled={!svg || downloading}
        className="w-full cursor-pointer rounded-xl border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-50"
      >
        {downloading ? "Downloading..." : "Download QR"}
      </button>
    </div>
  );
}

export function QRCodeDisplay({ qrCodes }: Props) {
  if (qrCodes.length === 0) {
    return (
      <div className="rounded-2xl bg-muted/50 p-8 text-center text-sm text-muted-foreground">
        QR codes will be generated once the guest confirms.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {qrCodes.map((qr) => (
        <QrBlock key={qr.id} label={qr.label} payload={qr.qrPayload} />
      ))}
    </div>
  );
}
