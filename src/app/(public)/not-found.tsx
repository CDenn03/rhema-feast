import Link from "next/link";

export default function PublicNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="mt-4 text-muted-foreground">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 text-primary underline underline-offset-4">Go home</Link>
    </main>
  );
}
