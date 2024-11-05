interface TokenData {
  id: string;
  username: string;
  email: string;
}

type Category =
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

type Reviews = {
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

type CartItemProps = {
  _id: string;
  pid: string;
  category: string;
  brandName: string;
  productName: string;
  color: string;
  quantity: number;
  varient: LaptopVarient | MobileVarient;
  img: string;
  isBuying?: boolean;
};

type ProductCardProps = {
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

type MobileProps = CommonProps & {
  rams: string[];
  storages: string[];
  varients: MobileVarient[];
};

type MobileVarient = {
  memory: string;
  storage: string;
  mrp: string;
  salePrice: string;
  inStock: InStock[];
};

type InStock = {
  color: string;
  stock: number;
};

type Color = {
  color: string;
  imgURLs: string[];
};

type LaptopProps = CommonProps & {
  display: string;
  rams: string[];
  storages: string[];
  processors: string[];
  gpus: string[];
  varients: LaptopVarient[];
};

type LaptopVarient = {
  memory: string;
  storage: string;
  processor: string;
  gpu: string;
  mrp: string;
  salePrice: string;
  inStock: InStock[];
};
