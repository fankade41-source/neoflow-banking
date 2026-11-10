import App from "@/App";
import { renderWithActor } from "@/__tests__/test-utils";
import type {
  Balance,
  MonthlyExpense,
  QuickAction,
  backendInterface,
} from "@/backend";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const BALANCE: Balance = {
  title: "Main Account",
  amountCents: 425000n,
  currency: "EUR",
};

const QUICK_ACTIONS: QuickAction[] = [
  { id: "send", title: "Send", icon: "send" },
  { id: "receive", title: "Receive", icon: "receive" },
  { id: "pay", title: "Pay", icon: "pay" },
  { id: "history", title: "History", icon: "history" },
];

const MONTHLY_EXPENSES: MonthlyExpense[] = [
  { month: "May", amountCents: 182400n },
  { month: "Jun", amountCents: 214750n },
  { month: "Jul", amountCents: 168900n },
  { month: "Aug", amountCents: 231300n },
  { month: "Sep", amountCents: 197650n },
  { month: "Oct", amountCents: 205100n },
];

function makeActor() {
  return {
    getBalance: vi.fn<backendInterface["getBalance"]>(async () => ({
      ...BALANCE,
    })),
    getQuickActions: vi.fn<backendInterface["getQuickActions"]>(async () =>
      QUICK_ACTIONS.map((a) => ({ ...a })),
    ),
    getMonthlyExpenses: vi.fn<backendInterface["getMonthlyExpenses"]>(
      async () => MONTHLY_EXPENSES.map((e) => ({ ...e })),
    ),
  } satisfies Pick<
    backendInterface,
    "getBalance" | "getQuickActions" | "getMonthlyExpenses"
  >;
}

describe("NeoFlow dashboard", () => {
  it("renders the balance, quick actions, chart, sandbox notice and bottom nav", async () => {
    const actor = makeActor();
    renderWithActor(<App />, actor);

    expect(
      await screen.findByTestId("dashboard.balance_amount"),
    ).toHaveTextContent("€4,250.00");
    expect(screen.getByText("Main Account")).toBeInTheDocument();

    const quickActions = screen.getByTestId("dashboard.quick_actions");
    for (const label of ["Send", "Receive", "Pay", "History"]) {
      expect(within(quickActions).getByText(label)).toBeInTheDocument();
    }

    const chart = screen.getByTestId("dashboard.expenses_chart");
    for (const month of ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]) {
      expect(within(chart).getByText(month)).toBeInTheDocument();
    }
    expect(
      screen.getByTestId("dashboard.expenses_chart.bar.1"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("dashboard.expenses_chart.bar.6"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("This is a sandbox educational prototype"),
    ).toBeInTheDocument();

    const nav = screen.getByTestId("dashboard.bottom_nav");
    for (const label of ["Home", "Cards", "Stats", "Profile"]) {
      expect(within(nav).getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByTestId("dashboard.nav.home")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("opens a simulated placeholder panel for each quick action", async () => {
    const user = userEvent.setup();
    const actor = makeActor();
    renderWithActor(<App />, actor);

    await screen.findByTestId("dashboard.balance_amount");

    for (const [index, title] of [
      [1, "Send"],
      [2, "Receive"],
      [3, "Pay"],
      [4, "History"],
    ] as const) {
      await user.click(screen.getByTestId(`dashboard.quick_action.${index}`));
      const panel = await screen.findByTestId("dashboard.action_panel");
      expect(within(panel).getByText(`${title} simulated`)).toBeInTheDocument();
      await user.click(
        within(panel).getByTestId("dashboard.action_panel.close_button"),
      );
      expect(
        screen.queryByTestId("dashboard.action_panel"),
      ).not.toBeInTheDocument();
    }
  });

  it("switches the active tab and view when a nav item is tapped", async () => {
    const user = userEvent.setup();
    const actor = makeActor();
    renderWithActor(<App />, actor);

    await screen.findByTestId("dashboard.balance_amount");

    await user.click(screen.getByTestId("dashboard.nav.stats"));

    expect(screen.getByTestId("dashboard.nav.stats")).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByTestId("dashboard.nav.home")).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByTestId("dashboard.stats_panel")).toBeInTheDocument();
    expect(
      screen.queryByTestId("dashboard.balance_card"),
    ).not.toBeInTheDocument();

    await user.click(screen.getByTestId("dashboard.nav.home"));
    expect(
      await screen.findByTestId("dashboard.balance_card"),
    ).toBeInTheDocument();
  });

  it("calls the backend consumer methods once on load", async () => {
    const actor = makeActor();
    renderWithActor(<App />, actor);

    await screen.findByTestId("dashboard.balance_amount");

    expect(actor.getBalance).toHaveBeenCalledTimes(1);
    expect(actor.getQuickActions).toHaveBeenCalledTimes(1);
    expect(actor.getMonthlyExpenses).toHaveBeenCalledTimes(1);
  });

  it("renders the shell and skeletons instead of a blank screen while loading", () => {
    const actor = makeActor();
    renderWithActor(<App />, actor);

    // The dashboard shell is present immediately, before any query resolves.
    expect(screen.getByTestId("dashboard.balance_card")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard.quick_actions")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard.expenses_chart")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard.bottom_nav")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sandbox educational prototype"),
    ).toBeInTheDocument();
    // The resolved balance amount is not shown until the query settles.
    expect(
      screen.queryByTestId("dashboard.balance_amount"),
    ).not.toBeInTheDocument();
  });

  it("keeps the shell usable when the balance query fails", async () => {
    const actor = makeActor();
    actor.getBalance.mockRejectedValueOnce(new Error("network down"));
    renderWithActor(<App />, actor);

    // The rest of the dashboard still renders; the failure does not blank the app.
    expect(
      await screen.findByTestId("dashboard.quick_actions"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("dashboard.bottom_nav")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sandbox educational prototype"),
    ).toBeInTheDocument();
  });
});
