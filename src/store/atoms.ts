import { atom } from "jotai";

export const allTokensAtom = atom([
  { decimals: 0, label: "", price: 0, url: "", value: "" },
]);

export const balanceAtom = atom([]);

export const selectedTokenIdAtom = atom("EGLD");

export const isLandAtom = atom(false);
export const isLkLandAtom = atom(false);
export const landPairAtom = atom({});
export const tokenAmountAtom = atom(0);

export const isLoadingAtom = atom(false);

export const loadingAtom = atom(false);

export const refreshCountAtom = atom(0);

export const pairsAtom = atom<any[]>([]);
export const tokensAtom = atom<any[]>([]);
export const selectedOptionAtom = atom([]);
