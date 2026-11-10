import DashboardLib "../lib/dashboard";
import Types "../types/dashboard";

mixin () {
  /// Returns the account balance shown on the dashboard.
  public query func getBalance() : async Types.Balance {
    DashboardLib.getBalance();
  };

  /// Returns monthly expense totals for the last several months,
  /// ordered oldest to newest.
  public query func getMonthlyExpenses() : async [Types.MonthlyExpense] {
    DashboardLib.getMonthlyExpenses();
  };

  /// Returns the fixed, ordered set of dashboard quick actions.
  public query func getQuickActions() : async [Types.QuickAction] {
    DashboardLib.getQuickActions();
  };
};
