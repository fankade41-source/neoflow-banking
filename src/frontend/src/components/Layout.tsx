import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Mobile-first shell: a centered max-width column that reads as a phone
 * screen on desktop while filling the viewport on real devices.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col border-border/60 bg-background sm:border-x">
        {children}
      </div>
    </div>
  );
}

export function AttributionFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-card/40 px-6 pb-6 pt-4 text-center">
      <a
        href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
          window.location.hostname,
        )}`}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        © {year}. Built with love using caffeine.ai
      </a>
    </footer>
  );
}
