import React, { useEffect } from "react";
// import "./App.css";
import Button from "./components/buttons";
import { LabelButton } from "./components/buttons/LabelButton";
import Selector from "./components/dropdown";
import Input from "./components/input";
// @ts-ignore
import { useForm } from "react-hook-form";
import Form from "./components/form";
import Details from "./components/details";
import { getAllTokens, getPairs } from "utils/pairs";
import { useAtom } from "jotai";
import { pairsAtom, tokensAtom } from "store/atoms";

interface FormValues {
  swapToId: string;
  swapToAmount: string;
  swapFromId: string;
  swapFromAmount: string;
  slippage: number;
}

const App = () => {
  const { handleSubmit, register, formState, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        swapToId: "LAND-40f26f",
        swapToAmount: "0",
        swapFromId: "USDC",
        swapFromAmount: "0",
        slippage: 1,
      },
    });
  const [pairs, setPairs] = useAtom(pairsAtom);
  const [tokens, setTokens] = useAtom(tokensAtom);

  const swapFromAmount = watch("swapFromAmount");
  const swapToAmount = watch("swapToAmount");

  console.log("swapFromAmount,swapToAmount", swapFromAmount, swapToAmount);

  // console.log("pairs,tokens", pairs, tokens);
  // TODO: fix render
  useEffect(() => {
    getPairs().then((res) => {
      setPairs(res.data.data.pairs);
    });

    getAllTokens().then((tokens) => {
      setTokens(tokens);
    });
  }, [setPairs, setTokens]);

  const allTokens = ["a", "b", "c", "d"];
  const tokenPrice = 100;
  const landBalance = 1000;
  const slippage = 1;
  const balance = 500;

  return (
    <div className="swap-container">
      <div className="header">
        <h1>Swap</h1>
      </div>
      <div className="swap-card">
        <Form
          tokenPrice={tokenPrice}
          register={register}
          allTokens={allTokens}
          landBalance={landBalance}
          balance={balance}
          setValue={setValue}
        />
        <div>-</div>
        <Details slippage={slippage} />
      </div>
      {/* <AnimatePresence>
            {showModal && (
              <SignTransactionsModal
                onClose={() => {
                  setShowModal(false);
                }}
              />
            )}
          </AnimatePresence> */}
    </div>
  );
};

export default App;
