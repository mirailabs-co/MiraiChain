import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<"svg">>;
	description: JSX.Element;
	url: string;
};

const FeatureList: FeatureItem[] = [
	{
		title: "Mirai Chain Overview",
		Svg: require("@site/static/img/logo.svg").default,
		description: <>Overview about Mirai Chain: ChainID, RPC URLs, ....</>,
		url: "/docs/category/mirai-chain",
	},
	{
		title: "MRC20 Token",
		Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
		description: <>An update of ERC20 on Mirai Chain to support gas-free transfer/permit/pay.</>,
		url: "/docs/category/mrc20",
	},
	{
		title: "Bridge with Mirai Chain",
		Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
		description: <>Deposit and withdraw assets with Mirai Chain.</>,
		url: "/docs/category/bridge",
	},
	{
		title: "DEX on Mirai Chain",
		Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
		description: <>Provide LP with GrootSwap on Mirai Chain.</>,
		url: "/docs/category/grootswap",
	},
	{
		title: "Gas-free on Mirai Chain",
		Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
		description: <>Support your users with gas-free on Mirai Chain.</>,
		url: "/docs/category/gas-free",
	},
];

function Feature({ title, Svg, description, url }: FeatureItem) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
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
