export interface TokenData {
  id: string;
  username: string;
  email: string;
}

export type Category =
  | "Category"
  | "Mobile"
  | "Laptop"
  | "Cabinate"
  | "Keyboard"
  | "Mouse"
  | "Headphone"
  | "PSU"
  | "Processor"
  | "Graphic Card"
  | "Memory"
  | "Monitor"
  | "Storage";

export type Reviews = {
  _id: string;
  username: string;
  rating: number;
  heading: string;
  review: string;
  likes: string[];
  dislikes: string[];
  // likedBy: string[];
  // dislikedBy: string[];
  createdAt: string;
};

type CommonProps = {
  _id: string;
  category: string;
  brandName: string;
  productName: string;
  color: Color[];
  defaultImgs?: string[];
  highlights: string[];
  rating: number;
  reviews: Reviews[];
};

export type CartItemProps = {
  pid: string;
  category: string;
  brandName: string;
  productName: string;
  color: string;
  quantity: number;
  varient: LaptopVarient | MobileVarient;
  img: string;
};

export type ProductCardProps = {
  pid: string;
  category: string;
  brandName: string;
  productName: string;
  color: string;
  highlights: string[];
  rating: number;
  reviews: Reviews[] | [];
  varient: LaptopVarient | MobileVarient;
  img: string;
};

export type MobileProps = CommonProps & {
  rams: string[];
  storages: string[];
  varients: MobileVarient[];
};

export type MobileVarient = {
  memory: string;
  storage: string;
  mrp: string;
  salePrice: string;
  inStock: InStock[];
};

export type InStock = {
  color: string;
  stock: number;
};

export type Color = {
  color: string;
  imgURLs: string[];
};

export type LaptopProps = CommonProps & {
  display: string;
  rams: string[];
  storages: string[];
  processors: string[];
  gpus: string[];
  varients: LaptopVarient[];
};

export type LaptopVarient = {
  memory: string;
  storage: string;
  processor: string;
  gpu: string;
  mrp: string;
  salePrice: string;
  inStock: InStock[];
};
