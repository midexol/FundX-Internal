export type CampaignStatus = "active" | "successful" | "failed";
export type FundingModel = "Flexible Model" | "All-or-Nothing";

export interface Campaign {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  projectStage: string;
  raised: number;
  goal: number;
  currency: "USDCx" | "STX";
  fundingModel: FundingModel;
  status: CampaignStatus;
  image: string;
  creator: string;
  daysRemaining?: number;
  backers: number;
  isTrending?: boolean;
}

// 🚨 THE SINGLE SOURCE OF TRUTH
export const CAMPAIGNS: Campaign[] = [
  {
    id: "defi-yield",
    title: "DeFi Yield Aggregator",
    tagline: "The first mobile-first yield aggregator on Stacks.",
    description: "Democratizing finance for the 99% with simple UX and trustless strategies.",
    category: "DeFi",
    projectStage: "MVP",
    raised: 55000,
    goal: 50000,
    currency: "USDCx",
    fundingModel: "Flexible Model",
    status: "successful",
    image: "/campaign-2.jpg",
    creator: "Alex Smith",
    backers: 1240,
    isTrending: false
  },
  {
    id: "stacks-bootcamp",
    title: "Stacks Dev Bootcamp",
    tagline: "Teaching Clarity smart contracts to 10,000 developers.",
    description: "We are building the next generation of Bitcoin builders.",
    category: "Education",
    projectStage: "Prototype",
    raised: 4500,
    goal: 10000,
    currency: "STX",
    fundingModel: "All-or-Nothing",
    status: "active",
    daysRemaining: 12,
    image: "/campaign-1.jpg",
    creator: "DeFi Academy",
    backers: 340,
    isTrending: true
  },
  {
    id: "nft-marketplace",
    title: "NFT Marketplace",
    tagline: "A zero-fee marketplace for Stacks NFTs.",
    description: "Trading digital assets should not cost a fortune.",
    category: "Gaming",
    projectStage: "Idea",
    raised: 1200,
    goal: 50000,
    currency: "STX",
    fundingModel: "All-or-Nothing",
    status: "failed",
    image: "/campaign-3.jpg",
    creator: "ArtBlocks",
    backers: 45,
    isTrending: false
  },
  {
    id: "green-mining",
    title: "Green Mining Farm",
    tagline: "Solar-powered Bitcoin mining initiative.",
    description: "Carbon neutral production ensuring the future of sustainable POW.",
    category: "Mining",
    projectStage: "MVP",
    raised: 12000,
    goal: 50000,
    currency: "STX",
    fundingModel: "All-or-Nothing",
    status: "active",
    daysRemaining: 21,
    image: "/campaign-1.jpg",
    creator: "EcoBit",
    backers: 85,
    isTrending: false
  }
];

// Helper functions for the rest of the app
export function getAllCampaigns() { return CAMPAIGNS; }
export function getCampaign(id: string) { return CAMPAIGNS.find((c) => c.id === id); }