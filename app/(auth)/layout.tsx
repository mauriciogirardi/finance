import { Logo } from "@/icons/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center">{children}</div>
      <div className="hidden lg:flex bg-slate-950 h-full items-center justify-center">
        <Logo className="text-zinc-200" size={150} />
      </div>
    </main>
  );
}
