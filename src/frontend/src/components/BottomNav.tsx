import { BarChart3, CreditCard, Home, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TabId = "home" | "cards" | "stats" | "profile";

interface TabDef {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

const TABS: TabDef[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
];

interface BottomNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      data-ocid="dashboard.bottom_nav"
      aria-label="Primary"
      className="sticky bottom-0 z-20 border-t border-border/70 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <ul className="grid grid-cols-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <li key={tab.id}>
              <button
                type="button"
                data-ocid={`dashboard.nav.${tab.id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onChange(tab.id)}
                className={`flex w-full flex-col items-center gap-1 px-2 py-3 text-[0.7rem] font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative flex h-6 items-center justify-center">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-primary"
                    />
                  )}
                </span>
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
