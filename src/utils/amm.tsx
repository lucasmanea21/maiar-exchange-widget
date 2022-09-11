import { Token } from "types";

export const getEquivalent = (
  tokenPair: any,
  amount: number,
  isReversed: boolean,
  setExchangeRate?: any
) => {
  if (!(Object.keys(tokenPair).length === 0) && amount > 0) {
    const {
      reserves0: tokenReserves,
      reserves1: usdcReserves,
      // @ts-ignore
    } = tokenPair?.info;

    const realReserves = {
      tokenReserves: tokenReserves / 10 ** 18,
      usdcReserves: usdcReserves / 10 ** 6,
    };

    console.log(tokenPair, amount, isReversed);
    console.log("amount", amount);

    const newReserves = calculateNewReserves({
      isReversed,
      realReserves,
      amount: amount * 10 ** 6,
    });

    console.log("newReserves, realReserves", newReserves, realReserves);

    const exchangeRate = newReserves.usdcReserves / newReserves.tokenReserves;
    //   round to 5 decimals
    setExchangeRate &&
      setExchangeRate(Number(parseFloat(exchangeRate.toString()).toFixed(5)));

    const equivalent = calculateEquivalent({
      isReversed,
      realReserves,
      newReserves,
    });

    return equivalent;
  } else {
    return 0;
  }
};

const calculateNewReserves = ({ isReversed, realReserves, amount }: any) => {
  const total = realReserves.tokenReserves * realReserves.usdcReserves;
  console.log(
    "isReversed, realReserves, amount ",
    isReversed,
    realReserves,
    amount,
    total
  );

  // AMM calculation based on x*y=k, with total = k
  return !isReversed
    ? {
        tokenReserves: total / (realReserves.usdcReserves + amount),
        usdcReserves: realReserves.usdcReserves + amount,
      }
    : {
        tokenReserves: realReserves.tokenReserves + amount,
        usdcReserves: total / (realReserves.tokenReserves + amount),
      };
};

const calculateEquivalent = ({
  isReversed,
  realReserves,
  newReserves,
}: any) => {
  return !isReversed
    ? realReserves.tokenReserves -
        newReserves.tokenReserves -
        0.01 * (realReserves.tokenReserves - newReserves.tokenReserves)
    : realReserves.usdcReserves -
        newReserves.usdcReserves -
        0.01 * (realReserves.usdcReserves - newReserves.usdcReserves);
};

export const convertToUSDC = (
  pairs: any,
  amount: number,
  token: Token,
  isReversed: boolean
) => {
  if (pairs && token) {
    const isWegld = token.value.split("-")[0] === "WEGLD";

    // WEGLD - USDC pair details

    const EGLDUSDCPair = pairs.filter((pair: any) => {
      return (
        pair.firstToken.identifier.split("-")[0] === "WEGLD" &&
        pair.secondToken.identifier.split("-")[0] === "USDC"
      );
    })[0];

    const EGLDUSDCReserves = EGLDUSDCPair && {
      wegld: EGLDUSDCPair["info"]["reserves0"] / 10 ** 18,
      usdc: EGLDUSDCPair["info"]["reserves1"] / 10 ** 6,
      total:
        ((EGLDUSDCPair["info"]["reserves0"] / 10 ** 18) *
          EGLDUSDCPair["info"]["reserves1"]) /
        10 ** 6,
    };

    // WEGLD - TOKEN pair details
    const wegldTokenPair = findWegldTokenPair({
      pairs,
      token,
      isReversed,
    });

    // console.log("wegldtokenpair", wegldTokenPair);
    const wegldTokenReserves = wegldTokenPair && {
      wegld: isReversed
        ? wegldTokenPair["info"]["reserves0"] / 10 ** token.decimals
        : wegldTokenPair["info"]["reserves1"] / 10 ** 18,
      token: isReversed
        ? wegldTokenPair["info"]["reserves1"] / 10 ** 18
        : wegldTokenPair["info"]["reserves0"] / 10 ** token.decimals,
      total:
        ((wegldTokenPair["info"]["reserves1"] / 10 ** 18) *
          wegldTokenPair["info"]["reserves0"]) /
        10 ** token.decimals,
    };

    //    new reserves and received tokens amount for WEGLD - TOKEN pair

    const newWegldTokenReserves = wegldTokenReserves && {
      token: wegldTokenReserves["token"] + amount,
      wegld:
        wegldTokenReserves["total"] / (wegldTokenReserves["token"] + amount),
    };

    //   calculate new reserves and received tokens amount for WEGLD - USDC pair

    const wegldReceived = getWegldReceived({
      wegldTokenReserves,
      newWegldTokenReserves,
      wegldTokenPair,
    });

    const newWegldUsdcReserves = EGLDUSDCReserves && {
      wegld: EGLDUSDCReserves["wegld"] + (isWegld ? amount : wegldReceived),
      usdc:
        EGLDUSDCReserves["total"] /
        (EGLDUSDCReserves["wegld"] + (isWegld ? amount : wegldReceived)),
    };

    const usdcReceived = getUsdcReceived({
      EGLDUSDCReserves,
      newWegldUsdcReserves,
    });

    return { wegldReceived, usdcReceived };
  } else {
    return { wegldReceived: 0, usdcReceived: 0 };
  }
};

const findWegldTokenPair = ({ pairs, token, isReversed }: any) => {
  return pairs.filter((pair: any) => {
    const { value } = token;

    const isFirst =
      pair.firstToken.identifier.split("-")[0] === value.split("-")[0] &&
      pair.secondToken.identifier.split("-")[0] === "WEGLD";

    const isSecond =
      pair.secondToken.identifier.split("-")[0] === value.split("-")[0] &&
      pair.firstToken.identifier.split("-")[0] === "WEGLD";

    if (isSecond) {
      isReversed = true;
    }

    return isFirst || isSecond;
  })[0];
};

const getWegldReceived = ({
  wegldTokenReserves,
  newWegldTokenReserves,
  wegldTokenPair,
}: any) => {
  return (
    wegldTokenReserves &&
    newWegldTokenReserves &&
    wegldTokenReserves["wegld"] -
      newWegldTokenReserves["wegld"] -
      wegldTokenPair.totalFeePercent *
        (wegldTokenReserves["wegld"] - newWegldTokenReserves["wegld"])
  );
};

const getUsdcReceived = ({ EGLDUSDCReserves, newWegldUsdcReserves }: any) => {
  return (
    EGLDUSDCReserves &&
    newWegldUsdcReserves &&
    EGLDUSDCReserves["usdc"] -
      newWegldUsdcReserves["usdc"] -
      0.003 * (EGLDUSDCReserves["usdc"] - newWegldUsdcReserves["usdc"])
  );
};
