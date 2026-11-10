import type { Balance } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format";
import { ArrowUpRight, ShieldCheck, TrendingUp } from "lucide-react";

interface BalanceCardProps {
  balance: Balance | null | undefined;
  isLoading: boolean;
}

export function BalanceCard({ balance, isLoading }: BalanceCardProps) {
  return (
    <section
      data-ocid="dashboard.balance_card"
      className="animate-rise relative overflow-hidden rounded-3xl bg-gradient-panel p-6 shadow-elevated ring-1 ring-inset ring-white/5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-primary/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-10 h-44 w-44 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {balance?.title ?? "Total balance"}
          </p>
          {isLoading || !balance ? (
            <Skeleton className="mt-3 h-11 w-48 rounded-xl bg-white/10" />
          ) : (
            <p
              data-ocid="dashboard.balance_amount"
              className="font-numeric mt-2 text-4xl font-semibold text-foreground sm:text-[2.75rem]"
            >
              {formatCurrency(balance.amountCents, balance.currency)}
            </p>
          )}
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-accent ring-1 ring-inset ring-white/10">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <div className="relative mt-6 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          +2.4% this month
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          Available now
        </span>
      </div>
    </section>
  );
}
