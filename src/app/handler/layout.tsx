import HandlerHeader from "@components/layout/header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen flex-col">
      <HandlerHeader />
      <div className="grow">{children}</div>
    </div>
  );
}
