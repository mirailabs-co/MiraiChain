import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<"svg">>;
  svgPath?: string;
  description: JSX.Element;
  url: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Mirai Chain Overview",
    svgPath: "img/logo.svg",
    description: <>Overview about Mirai Chain: ChainID, RPC URLs, ....</>,
    url: "/docs/category/mirai-chain",
  },
  {
    title: "MRC20 Token",
    svgPath: "img/mrc20.svg",
    description: (
      <>
        An update of ERC20 on Mirai Chain to support gas-free
        transfer/permit/pay.
      </>
    ),
    url: "/docs/category/mrc20",
  },
  {
    title: "Bridge with Mirai Chain",
    svgPath: "img/bridge.svg",
    description: <>Deposit and withdraw assets with Mirai Chain.</>,
    url: "/docs/category/bridge",
  },
  {
    title: "DEX on Mirai Chain",
    svgPath: "img/dex.svg",
    description: <>Provide LP with GrootSwap on Mirai Chain.</>,
    url: "/docs/category/grootswap",
  },
  {
    title: "Gas-free on Mirai Chain",
    svgPath: "img/sc.svg",
    description: <>Support your users with gas-free on Mirai Chain.</>,
    url: "/docs/category/gas-free",
  },
];

function Feature({ title, Svg, svgPath, description, url }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
        <img src={svgPath} className={styles.featureSvg} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.buttons}>
        <Link className="button button--secondary button--lg" to={url}>
          Let's go
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
