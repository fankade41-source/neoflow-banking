import Common "common";

module {
  /// The account balance shown on the dashboard.
  public type Balance = {
    /// Account title, e.g. "Main Account".
    title : Common.Label;
    /// Balance in EUR cents (4250.00 EUR = 425000).
    amountCents : Common.AmountCents;
    /// ISO 4217 currency code, e.g. "EUR".
    currency : Text;
  };

  /// One month's total expenses for the bar chart.
  public type MonthlyExpense = {
    /// Month title, e.g. "Jan".
    month : Common.Label;
    /// Total expenses for the month, in EUR cents.
    amountCents : Common.AmountCents;
  };

  /// A dashboard quick action.
  public type QuickAction = {
    /// Stable identifier, e.g. "send".
    id : Text;
    /// Display title, e.g. "Send".
    title : Common.Label;
    /// Icon name the frontend maps to an icon component.
    icon : Text;
  };
};
