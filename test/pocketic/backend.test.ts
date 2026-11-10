import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  await pic?.tearDown();
});

it("returns the dashboard balance without trapping", async () => {
  const balance = await actor.getBalance();
  expect(balance.title).toBe("Main Account");
  expect(balance.amountCents).toBe(425000n);
  expect(balance.currency).toBe("EUR");
});

it("returns the fixed ordered quick actions", async () => {
  const actions = await actor.getQuickActions();
  expect(actions.map((a) => a.title)).toEqual([
    "Send",
    "Receive",
    "Pay",
    "History",
  ]);
});

it("returns monthly expenses ordered oldest to newest", async () => {
  const expenses = await actor.getMonthlyExpenses();
  expect(expenses.length).toBeGreaterThanOrEqual(3);
  expect(expenses.map((e) => e.month)).toEqual([
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ]);
  for (const expense of expenses) {
    expect(expense.amountCents).toBeGreaterThan(0n);
  }
});

it("answers the API documentation read instead of trapping", async () => {
  await expect(actor.getApiDoc()).resolves.toEqual(expect.any(String));
});
