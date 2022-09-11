import Swap from "components/swap";
import { useAtom } from "jotai";
import React from "react";
import { tokensAtom } from "store/atoms";
import Button from "../buttons";
import { LabelButton } from "../buttons/LabelButton";
import Selector from "../dropdown";
import Input from "../input";

const Form = ({
  tokenPrice,
  register,
  allTokens,
  landBalance,
  balance,
  setValue,
}: any) => {
  const [tokens, setTokens] = useAtom(tokensAtom);

  return (
    // <form onSubmit={onSubmit}>
    <form>
      <Swap setValue={setValue} register={register} />
      <div className="balance-wrapper">
        <p className="small-text">
          Balance: <span>{balance}</span>
        </p>
        {/* <LabelButton onClick={() => handleUpdateInputs(balance, true)} /> */}
        <LabelButton />
      </div>
      <div>Arrow</div>
      <div className="amount-wrapper">
        <div className="input-with-select">
          <Input
            {...register("swapToAmount", {
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid amount",
              },
            })}
            containerClassName="offsetted-container"
            onChange={(e) => {
              // handleUpdateInputsReverse(
              //   parseFloat(e.target.value),
              //   false
              // );
              setValue("swapToAmount", e.target.value);
            }}
            label="Swap to:"
            type="number"
          />
          <Selector containerClassname="absolute-select" options={tokens} />
        </div>
        {tokenPrice && <p className="token-price">≈ ${tokenPrice["land"]}</p>}
      </div>

      <p className="small-text" id="balance-land">
        Balance: <span className="ml-1 text-white"> {landBalance}</span>
      </p>
      <div className="swap-card-actions">
        <Button
          type="submit"
          className="filled"
          // onClick={onSubmit}
          hideComingSoon
        >
          Swap
        </Button>
      </div>
    </form>
  );
};

export default Form;
