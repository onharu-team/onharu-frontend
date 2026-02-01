interface DefaultCard {
  storeId: string;
  storelink: string;
  storeThumnail: React.ReactNode;
  storename: string;
  storeIntroduce: string;
}

interface CharityCard extends DefaultCard {
  type: "charity";
  category: React.ReactNode;
  hashtags: React.ReactNode;
}

interface NearbyCard extends DefaultCard {
  type: "nearby";
  operating: React.ReactNode;
  storeAddress: React.ReactNode;
  reservation: React.ReactNode;
  activeId: string;
}

export type CardProps = CharityCard | NearbyCard;
