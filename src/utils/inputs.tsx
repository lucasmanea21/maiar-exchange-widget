import { convertToUSDC, getEquivalent } from "./amm";

type Inputs = {
  value: number;
  isMax: boolean;
  tokens: any;
  selectedOption: any;
  setValue: any;
  pairs: any;
};

export const handleUpdateInputs = ({
  value,
  isMax,
  tokens,
  selectedOption,
  setValue,
  pairs,
}: Inputs) => {
  const wantedToken = tokens.filter(
    (token: any) => token.value === selectedOption
  )[0];
  const wantedPair = pairs.filter(
    (pair: any) =>
      pair.firstToken.identifier === selectedOption ||
      pair.secondToken.identifier === selectedOption
  )[0];

  let equivalent = {};

  const { usdcReceived, wegldReceived } = getWegldUsdcAmount({
    pairs,
    value,
    selectedOption,
    wantedToken,
    tokens,
  });

  isMax && handleIsMax({ setValue, selectedOption, value });

  if (selectedOption == "EGLD") {
    equivalent = getEquivalent(wantedPair, usdcReceived, false);
  } else {
    equivalent =
      selectedOption?.split("-")[0] == "USDC"
        ? getEquivalent(wantedPair, value, false)
        : getEquivalent(wantedPair, usdcReceived, false);
  }

  equivalent >= 0 &&
    setValue("swapToAmount", parseFloat(equivalent?.toString()).toFixed(5));
};

const handleIsMax = ({ setValue, selectedOption, value }: any) => {
  setValue(
    "swapFromAmount",
    selectedOption !== "EGLD" ? value.toString() : (value - 0.0004).toString()
  );
};

const getWegldUsdcAmount = ({
  pairs,
  value,
  selectedOption,
  wantedToken,
  tokens,
}: any) => {
  const { usdcReceived, wegldReceived } = convertToUSDC(
    pairs,
    value,
    !(selectedOption == "EGLD")
      ? wantedToken
      : tokens.filter((token: any) => token.value === "WEGLD-bd4d79")[0],
    true
  );

  //   setWegldAmount(wegldReceived);
  //   setUsdcAmount(usdcReceieved);

  return { usdcReceived, wegldReceived };
};
