import axios from "axios";

export const getPairs = async () => {
  const res = await axios.post("https://graph.maiar.exchange/graphql", {
    query:
      "\n      {\n        pairs(offset: 0, limit: 500) {\n          address\n          state\n          totalFeePercent\n          info {\n            reserves0\n            reserves1\n            totalSupply\n          }\n          firstToken {\n            identifier\n          }\n          secondToken {\n            identifier\n          }\n          liquidityPoolToken {\n            identifier\n            decimals\n          }\n        }\n      }\n    ",
  });

  return res;
};

export const getAllTokens = async () => {
  let tokensFiltered = [];
  // TODO: make it work on devnet / testnet
  let res = await axios.get(`https://api.elrond.com/mex/tokens`);

  const tokens = res.data.map((token: any) => {
    return { value: token.id, label: token.name };
  });

  const { data: tokenInfos } = await axios.get(
    `https://api.elrond.com/tokens?identifiers=${tokens
      .map((token: any) => token.value)
      .join(",")}`
  );

  tokensFiltered = tokens.map((token: any) => {
    const wantedToken = tokenInfos.find(
      (tokenInfo: any) => tokenInfo.identifier === token.value
    );

    return {
      ...token,
      label: token.value.split("-")[0],
      price: wantedToken?.price,
      decimals: wantedToken?.decimals,
      url: wantedToken?.assets.pngUrl,
    };
  });

  tokensFiltered.push({
    label: "EGLD",
    price: 1,
    decimals: 18,
    url: "https://assets.coingecko.com/coins/images/12645/thumb/Elrond.png?1601374119",
  });

  return tokensFiltered;
};
