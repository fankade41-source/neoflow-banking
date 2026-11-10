import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useBalance() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBalance();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useQuickActions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["quick-actions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuickActions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMonthlyExpenses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["monthly-expenses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMonthlyExpenses();
    },
    enabled: !!actor && !isFetching,
  });
}
