---
sidebar_position: 2
---

# Example

**MRC20Upgradeable.sol**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./MIP712Upgradeable.sol";
import "../interfaces/IMRC20.sol";

contract MRC20Upgradeable is IMRC20, ERC20Upgradeable, MIP712Upgradeable {
    bytes32 public constant PERMIT_TYPEHASH =
    keccak256("Permit(address owner,address spender,uint256 value,uint256 fee,uint256 nonce,uint256 deadline)");

    bytes32 public constant TRANSFER_TYPEHASH =
    keccak256("Transfer(address owner,address to,uint256 value,uint256 fee,uint256 nonce,uint256 deadline)");

    bytes32 public constant PAY_TYPEHASH =
    keccak256("Pay(address owner,address to,uint256 value,uint256 fee,uint256 nonce,uint256 deadline)");

    bytes32 public constant BURN_TYPEHASH =
    keccak256("Burn(address owner,uint256 value,uint256 fee,uint256 nonce,uint256 deadline)");

    mapping(address => uint256) public nonces;

    // Define a mapping to keep track of used signatures
    mapping(bytes32 => bool) private _usedPayId;

    modifier validatePayId(string memory payId) {
        bytes32 payIdHash = keccak256(bytes(payId));
        require(!_usedPayId[payIdHash], "MRC20: PayId has already been used");
        _usedPayId[payIdHash] = true;
        _;
    }

    function __MRC20_init(string memory name_, string memory symbol_, string memory version_) internal onlyInitializing {
        __MIP712_init(name_, version_);
        __ERC20_init(name_, symbol_);
    }

    function transferWithPermit(
        TransferRequest calldata request,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) validateDeadline(request.deadline)
    public override returns (bool) {
        bytes32 structHash = keccak256(abi.encode(
                TRANSFER_TYPEHASH,
                request.owner,
                request.to,
                request.value,
                request.fee,
                nonces[request.owner]++,
                request.deadline
            ));
        _verifyEIP712(request.owner, structHash, v, r, s);
        _transfer(request.owner, request.to, request.value);

        if (request.fee > 0) {
            _transfer(request.owner, msg.sender, request.fee);
        }

        return true;
    }

    function payWithPermit(PayRequest calldata request, uint8 v, bytes32 r, bytes32 s)
    validateDeadline(request.deadline)
    validatePayId(request.payId)
    public override returns (bool) {
        bytes32 structHash = keccak256(abi.encode(
                PAY_TYPEHASH,
                request.owner,
                request.to,
                request.value,
                request.fee,
                nonces[request.owner]++,
                request.deadline
            ));
        _verifyEIP712(request.owner, structHash, v, r, s);
        _transfer(request.owner, request.to, request.value);

        if (request.fee > 0) {
            _transfer(request.owner, msg.sender, request.fee);
        }

        emit Pay(request.owner, request.to, request.payId, request.value, request.fee);

        return true;
    }

    function burnWithPermit(
        BurnRequest calldata request,
        uint8 v,
        bytes32 r,
        bytes32 s
    )
    validateDeadline(request.deadline)
    public override returns (bool) {
        bytes32 structHash = keccak256(abi.encode(
                BURN_TYPEHASH,
                request.owner,
                request.value,
                request.fee,
                nonces[request.owner]++,
                request.deadline
            ));
        _verifyEIP712(request.owner, structHash, v, r, s);

        _burn(request.owner, request.value);

        if (request.fee > 0) {
            _transfer(request.owner, msg.sender, request.fee);
        }

        return true;
    }

    function permit(PermitRequest calldata request, uint8 v, bytes32 r, bytes32 s)
    validateDeadline(request.deadline)
    public override {
        bytes32 structHash = keccak256(abi.encode(
                PERMIT_TYPEHASH,
                request.owner,
                request.spender,
                request.value,
                request.fee,
                nonces[request.owner]++,
                request.deadline
            ));
        _verifyEIP712(request.owner, structHash, v, r, s);
        _approve(request.owner, request.spender, request.value);

        if (request.fee > 0) {
            _transfer(request.owner, msg.sender, request.fee);
        }
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
```

**MIP712Upgradeable.sol**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";

contract MIP712Upgradeable is EIP712Upgradeable {
    modifier validateDeadline(uint deadline) {
        require(block.timestamp <= deadline, "MIP712: EXPIRED");
        _;
    }

    function __MIP712_init(string memory name_, string memory version_) internal onlyInitializing {
        __EIP712_init(name_, version_);
    }

    function _verifyEIP712(
        address from,
        bytes32 structHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal view {
        address signer = ECDSAUpgradeable.recover(_hashTypedDataV4(structHash), v, r, s);
        require(signer != address(0) && signer == from, "MIP712: INVALID_SIGNATURE");
    }

    function _getSigner(
        bytes32 structHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal view returns (address){
        return ECDSAUpgradeable.recover(_hashTypedDataV4(structHash), v, r, s);
    }
}
```
