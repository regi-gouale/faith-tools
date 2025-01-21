import HandlerHeader from "@components/layout/header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen">
      <HandlerHeader />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
