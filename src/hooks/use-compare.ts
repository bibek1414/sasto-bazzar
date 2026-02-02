"use client";

import { useSastoBazzarCompare } from "@/contexts/SastoBazzarCompareContext";

/**
 * A unified hook for compare functionality.
 * Wraps useSastoBazzarCompare to provide a consistent interface.
 */
export const useCompare = () => {
  const { compareItems, addToCompare, removeFromCompare, isInCompare } =
    useSastoBazzarCompare();

  return {
    compareItems,
    addToCompare,
    removeFromCompare,
    isInCompare,
  };
};
