import { Info } from "lucide-react";

export function SandboxNotice() {
  return (
    <div
      data-ocid="dashboard.sandbox_notice"
      className="flex items-start gap-2.5 rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3"
    >
      <Info
        className="mt-0.5 h-4 w-4 shrink-0 text-warning"
        aria-hidden="true"
      />
      <p className="text-xs leading-relaxed text-warning-foreground/90">
        This is a sandbox educational prototype
      </p>
    </div>
  );
}
