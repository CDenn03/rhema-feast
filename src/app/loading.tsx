import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
