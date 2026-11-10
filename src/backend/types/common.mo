module {
  /// A monetary amount in EUR, expressed in integer cents to avoid
  /// floating-point rounding. 4250.00 EUR is represented as 425000.
  public type AmountCents = Nat;

  /// A short human-readable label, e.g. a month name or an account name.
  public type Label = Text;
};
