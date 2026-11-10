import type { QuickAction } from "@/backend";
import { ActionPanel } from "@/components/ActionPanel";
import { BalanceCard } from "@/components/BalanceCard";
import { BottomNav, type TabId } from "@/components/BottomNav";
import { ExpensesChart } from "@/components/ExpensesChart";
import { AttributionFooter, Layout } from "@/components/Layout";
import { QuickActions } from "@/components/QuickActions";
import { SandboxNotice } from "@/components/SandboxNotice";
import {
  useBalance,
  useMonthlyExpenses,
  useQuickActions,
} from "@/hooks/useQueries";
import { Bell, Sparkles } from "lucide-react";
import { useState } from "react";

const TAB_TITLES: Record<TabId, string> = {
  home: "Dashboard",
  cards: "Cards",
  stats: "Stats",
  profile: "Profile",
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [selectedAction, setSelectedAction] = useState<QuickAction | null>(
    null,
  );

  const balance = useBalance();
  const quickActions = useQuickActions();
  const monthlyExpenses = useMonthlyExpenses();

  return (
    <Layout>
      <header className="flex items-center justify-between border-b border-border/60 bg-card/60 px-6 pb-4 pt-8 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-subtle">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-base font-semibold tracking-tight">
              NeoFlow
            </p>
            <p className="text-[0.7rem] text-muted-foreground">
              {TAB_TITLES[activeTab]}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          data-ocid="dashboard.notifications_button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground ring-1 ring-inset ring-white/5 transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent"
          />
        </button>
      </header>

      <main className="flex-1 space-y-6 px-6 pb-6">
        {activeTab === "home" && (
          <>
            <BalanceCard balance={balance.data} isLoading={balance.isLoading} />
            <QuickActions
              actions={quickActions.data}
              isLoading={quickActions.isLoading}
              onSelect={setSelectedAction}
            />
            <ExpensesChart
              expenses={monthlyExpenses.data}
              isLoading={monthlyExpenses.isLoading}
            />
            <SandboxNotice />
          </>
        )}

        {activeTab !== "home" && (
          <section
            data-ocid={`dashboard.${activeTab}_panel`}
            className="motion-safe:animate-rise flex flex-col items-center justify-center rounded-3xl bg-card px-6 py-16 text-center shadow-subtle ring-1 ring-inset ring-white/5"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold">
              {TAB_TITLES[activeTab]} coming soon
            </h2>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              This section is part of the NeoFlow sandbox prototype and is not
              available yet.
            </p>
          </section>
        )}
      </main>

      <AttributionFooter />
      <BottomNav active={activeTab} onChange={setActiveTab} />
      <ActionPanel
        action={selectedAction}
        onClose={() => setSelectedAction(null)}
      />
    </Layout>
  );
}
