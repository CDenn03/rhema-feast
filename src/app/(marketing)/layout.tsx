import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
