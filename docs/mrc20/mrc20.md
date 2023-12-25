---
sidebar_position: 1
---

# Token Stardard

MRC20 is a token standard on Mirai Chain. It is an extension of the Ethereum ERC-20 token standard, and it defines a set of rules that all MRC20 tokens must follow. These rules include how tokens can be transferred, paid, burned, and minted. It is designed to enable developers to create and deploy tokens on Mirai Chain.

### Difference between MRC20 and ERC20

MRC20 and ERC20 are both token standards, but they are used on different blockchains. MRC20 is used on Mirai Chain with supported for gas-free using for normal users, while ERC20 is used on Ethereum.

Here is a summary of the key differences between MRC20 and ERC20 tokens:

| Feature           | MRC20       | ERC20    |
| ----------------- | ----------- | -------- |
| Blockchain        | Mirai Chain | Ethereum |
| Transaction fees  | Low or Free | High     |
| Transaction speed | Fast        | Slow     |

### Implementing MRC20 Tokens

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMRC20 {
    struct PermitRequest {
        address owner;
        address spender;
        uint256 value;
        uint256 fee;
        uint256 deadline;
    }
    struct TransferRequest {
        address owner;
        address to;
        uint256 value;
        uint256 fee;
        uint256 deadline;
    }
    struct PayRequest {
        address owner;
        address to;
        string payId;
        uint256 value;
        uint256 fee;
        uint256 deadline;
    }
    struct BurnRequest {
        address owner;
        uint256 value;
        uint256 fee;
        uint256 deadline;
    }

    function totalSupply() external view returns (uint256);
    function decimals() external view returns (uint8);
    function symbol() external view returns (string memory);
    function name() external view returns (string memory);
    function getOwner() external view returns (address);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Transfer MRC20 token to a specified address
     *
     * @param request: transfer request
     * @param v: signature
     * @param r: signature
     * @param s: signature
     */
    function transferWithPermit(TransferRequest calldata request, uint8 v, bytes32 r, bytes32 s) external returns (bool);

    /**
     * @dev Pay for payId with MRC20 token
     * @param request: pay request
     * @param v: signature
     * @param r: signature
     * @param s: signature
     */
    function payWithPermit(PayRequest calldata request, uint8 v, bytes32 r, bytes32 s) external returns (bool);

    /**
     * @dev Burn MRC20 token
     * @param request: burn request
     * @param v: signature
     * @param r: signature
     * @param s: signature
     */
    function burnWithPermit(BurnRequest calldata request, uint8 v, bytes32 r, bytes32 s) external returns (bool);

    function allowance(address _owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Approve MRC20 token to a specified address
     * @param request: permit request
     * @param v: signature
     * @param r: signature
     * @param s: signature
     */
    function permit(PermitRequest calldata request, uint8 v, bytes32 r, bytes32 s) external;

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Pay(address indexed from, address indexed to, string payId, uint256 amount, uint256 fee);
}
```
