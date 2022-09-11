import Selector from "components/dropdown";
import Input from "components/input";
import { useAtom } from "jotai";
import React from "react";
import { pairsAtom, selectedOptionAtom, tokensAtom } from "store/atoms";
import { handleUpdateInputs } from "utils/inputs";

const Swap = ({ tokenPrice, register, setValue }: any) => {
  const [tokens] = useAtom(tokensAtom);
  const [pairs] = useAtom(pairsAtom);
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom);

  return (
    <div className="amount-wrapper">
      <div className="input-with-select">
        <Input
          {...register("swapFromAmount", {
            valueAsNumber: true,
          })}
          containerClassName="offsetted-container"
          onChange={(e) => {
            if (e.target.value == "") {
              handleUpdateInputs({
                value: 0,
                isMax: false,
                tokens,
                selectedOption,
                setValue,
                pairs,
              });
              setValue("swapFromAmount", "");
            } else {
              handleUpdateInputs({
                value: parseFloat(e.target.value),
                isMax: false,
                tokens,
                selectedOption,
                setValue,
                pairs,
              });
              setValue("swapFromAmount", e.target.value);
            }
          }}
          label="Swap from:"
          type="number"
        />
        <Selector
          containerClassname="absolute-select"
          options={tokens}
          defaultValue={tokens.length > 0 && tokens[0]}
          onChange={(e: any) => {
            setSelectedOption(e.value);
          }}
        />
      </div>
      {tokenPrice && <p className="token-price">≈ ${tokenPrice["token"]}</p>}
    </div>
  );
};

export default Swap;
