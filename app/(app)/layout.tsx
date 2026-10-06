import { FocusPill } from "@/components/features/foco/FocusPill";
import { FocusRuntime } from "@/components/features/foco/FocusRuntime";
import { QuickAddProvider } from "@/components/shell/QuickAdd";
import { MobileTabBar } from "@/components/shell/MobileTabBar";
import { Sidebar } from "@/components/shell/Sidebar";
import { ToastProvider } from "@/components/ui/Toast";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <ToastProvider>
      <QuickAddProvider>
        <Sidebar />
        <div className="desk:pl-[260px]">
          <main className="mx-auto max-w-6xl px-4 pb-32 desk:px-10 desk:pb-16">{children}</main>
        </div>
        <FocusPill />
        <MobileTabBar />
        <FocusRuntime />
      </QuickAddProvider>
    </ToastProvider>
  );
}
