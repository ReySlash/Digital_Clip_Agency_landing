import { PortfolioModalProvider } from "@/contexts/portfolio-modal-context";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PortfolioModalProvider>{children}</PortfolioModalProvider>;
}
