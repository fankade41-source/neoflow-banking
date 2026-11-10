import Types "../types/dashboard";

module {
  /// The account balance shown on the dashboard.
  let balance : Types.Balance = {
    title = "Main Account";
    amountCents = 425000;
    currency = "EUR";
  };

  /// Monthly expense totals for the last several months, oldest to newest.
  let monthlyExpenses : [Types.MonthlyExpense] = [
    { month = "May"; amountCents = 182400 },
    { month = "Jun"; amountCents = 214750 },
    { month = "Jul"; amountCents = 168900 },
    { month = "Aug"; amountCents = 231300 },
    { month = "Sep"; amountCents = 197650 },
    { month = "Oct"; amountCents = 205100 },
  ];

  /// The fixed, ordered set of dashboard quick actions.
  let quickActions : [Types.QuickAction] = [
    { id = "send"; title = "Send"; icon = "send" },
    { id = "receive"; title = "Receive"; icon = "receive" },
    { id = "pay"; title = "Pay"; icon = "pay" },
    { id = "history"; title = "History"; icon = "history" },
  ];

  /// Returns the account balance shown on the dashboard.
  public func getBalance() : Types.Balance {
    balance;
  };

  /// Returns monthly expense totals for the last several months,
  /// ordered oldest to newest.
  public func getMonthlyExpenses() : [Types.MonthlyExpense] {
    monthlyExpenses;
  };

  /// Returns the fixed, ordered set of dashboard quick actions.
  public func getQuickActions() : [Types.QuickAction] {
    quickActions;
  };
};
