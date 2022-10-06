
# Maiar Exchange Widget

A widget for easily implementing Maiar Exchange swaps into any website.

---


Currently under development, not usable yet. Inspired by [Uniswap Widget](https://docs.uniswap.org/sdk/widgets/swap-widget).

## Abstract

Working on the [Landboard app](https://app.landboard.io/), we needed people to have an
easy way to directly mint our NFTs (which are only mintable with LAND, our native token),
directly with their EGLD.

Therefore, I've worked on developing a DEX interface to interact with the Maiar Exchange contracts, allowing people to swap any token listed on MEX for LAND.

[First implementation](https://user-images.githubusercontent.com/77828455/194394963-dbf4f404-d6ba-4ad9-8d2e-bdcf9bf2c7c1.png)

Ideally, anyone should be able to use the widget in apps - web3 or not 
(can implement Elrond auth just for the widget or integrate with existing auth),
allowing anyone to swap tokens on the Elrond blockchain without leaving the website. 

Current implementation is very hacky - especially the route calculations - 
which will be improved as development continues. 
## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## Contributing
Contributions are 100% welcome and needed. If you're willing to join this project, please reach out to me [via Telegram](https://t.me/lucasmanea)!
