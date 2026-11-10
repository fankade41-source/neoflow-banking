import type { QuickAction } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  History,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  send: ArrowUpRight,
  receive: ArrowDownLeft,
  pay: CreditCard,
  history: History,
};

interface QuickActionsProps {
  actions: QuickAction[] | undefined;
  isLoading: boolean;
  onSelect: (action: QuickAction) => void;
}

export function QuickActions({
  actions,
  isLoading,
  onSelect,
}: QuickActionsProps) {
  return (
    <section data-ocid="dashboard.quick_actions" className="animate-rise">
      <h2 className="mb-3 px-1 text-sm font-medium text-muted-foreground">
        Quick actions
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {isLoading || !actions
          ? Array.from({ length: 4 }, (_, i) => `action-skeleton-${i}`).map(
              (id) => (
                <div key={id} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-14 w-14 rounded-2xl bg-white/5" />
                  <Skeleton className="h-3 w-12 rounded bg-white/5" />
                </div>
              ),
            )
          : actions.map((action, index) => {
              const Icon = ICONS[action.id] ?? ArrowUpRight;
              return (
                <button
                  key={action.id}
                  type="button"
                  data-ocid={`dashboard.quick_action.${index + 1}`}
                  onClick={() => onSelect(action)}
                  className="group flex flex-col items-center gap-2 rounded-2xl p-1 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-primary ring-1 ring-inset ring-white/5 transition-smooth group-hover:bg-primary group-hover:text-primary-foreground group-active:scale-95">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {action.title}
                  </span>
                </button>
              );
            })}
      </div>
    </section>
  );
}
