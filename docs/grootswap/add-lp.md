---
sidebar_position: 3
---

# Liquidity Pool

Adding liquidity to a pool on GrootSwap is not just about participating in the DeFi ecosystem; it's also an opportunity to earn a share of the trading fees. In this guide, we'll walk you through the simple steps to get started.

### Why Create/Add Liquidity?

-   **Earn Passive Income**: Receive a portion of the trading fees generated from the pool.
-   **Contribute to the Ecosystem**: Help in maintaining the liquidity of your favorite tokens.

### How To Create Liquidity?

```typescript
import { MaxUint256, parseEther, parseUnits } from "ethers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import { ethers } from "hardhat";
import { MyToken } from "@app/types";

task("createLP")
	.addParam("token", "Address of your token")
	.addParam("amount", "Amount of your token without decimals")
	.addParam("amountpgx", "Amount of PGX without decimals")
	.setAction(async function (taskArguments: TaskArguments, { ethers }) {
		const [signer] = await ethers.getSigners();
		const Router = await ethers.getContractAt("GrootRouter", "0xfB335A59FE0A24BDb01B3B7dcA4d9843B696ebcC");
		const MyTokenFactory = await ethers.getContractFactory("MyToken");
		const token: MyToken = <MyToken>await MyTokenFactory.connect(signer).attach(taskArguments.token);
		const amount = parseUnits(taskArguments.amount, await token.decimals());
		const value = parseEther(taskArguments.amountpgx);
		const approve = await token.allowance(signer.address, await Router.getAddress());
		if (approve < amount) {
			await token.approve(await Router.getAddress(), MaxUint256);
		}
		const tx = await Router.connect(signer).addLiquidityETH(await token.getAddress(), amount, 0, 0, signer.address, 8888888888, {
			value,
			gasLimit: 5000000,
		});
		console.log(`Created LP at:`, tx.hash);
	});
```
