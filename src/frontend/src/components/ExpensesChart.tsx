import type { MonthlyExpense } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

interface ExpensesChartProps {
  expenses: MonthlyExpense[] | undefined;
  isLoading: boolean;
}

export function ExpensesChart({ expenses, isLoading }: ExpensesChartProps) {
  const max =
    expenses?.reduce(
      (acc, e) => (e.amountCents > acc ? e.amountCents : acc),
      0n,
    ) ?? 0n;
  const total = expenses?.reduce((acc, e) => acc + e.amountCents, 0n) ?? 0n;

  return (
    <section
      data-ocid="dashboard.expenses_chart"
      className="motion-safe:animate-rise rounded-3xl bg-card p-5 shadow-subtle ring-1 ring-inset ring-white/5"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">
            Monthly expenses
          </h2>
          {isLoading || !expenses ? (
            <Skeleton className="mt-2 h-6 w-24 rounded bg-white/5" />
          ) : (
            <p className="font-numeric mt-1 text-xl font-semibold text-foreground">
              {formatCurrency(total, "EUR")}
            </p>
          )}
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          Last {expenses?.length ?? 6} months
        </span>
      </div>

      <div
        data-ocid="dashboard.expenses_chart.canvas"
        className="mt-6 flex h-40 items-end justify-between gap-2 sm:gap-3"
      >
        {isLoading || !expenses
          ? Array.from({ length: 6 }, (_, i) => `bar-skeleton-${i}`).map(
              (id) => (
                <div
                  key={id}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <Skeleton className="h-full w-full rounded-t-lg bg-white/5" />
                  <Skeleton className="h-3 w-8 rounded bg-white/5" />
                </div>
              ),
            )
          : expenses.map((expense, index) => {
              const ratio =
                max > 0n ? Number(expense.amountCents) / Number(max) : 0;
              const heightPct = Math.max(ratio * 100, 6);
              const isPeak = expense.amountCents === max && max > 0n;
              return (
                <div
                  key={expense.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="font-numeric text-[0.65rem] text-muted-foreground">
                    {formatCompactCurrency(expense.amountCents)}
                  </span>
                  <div
                    data-ocid={`dashboard.expenses_chart.bar.${index + 1}`}
                    title={`${expense.month}: ${formatCurrency(expense.amountCents, "EUR")}`}
                    style={{
                      height: `${heightPct}%`,
                      animationDelay: `${index * 70}ms`,
                    }}
                    className={`motion-safe:animate-bar-grow w-full rounded-t-lg ${
                      isPeak ? "bg-gradient-accent" : "bg-gradient-primary"
                    }`}
                  />
                  <span className="text-[0.7rem] font-medium text-muted-foreground">
                    {expense.month}
                  </span>
                </div>
              );
            })}
      </div>
    </section>
  );
}
