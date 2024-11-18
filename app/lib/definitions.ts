// data definitions
import { ChangeEvent, ReactNode, RefObject } from 'react';
import { z } from 'zod';

export type DataProps = {
  id: string;
  name: string;
  brand: string;
  variety: string;
  category: string;
  region: string;
  volumeMl: number;
  packaging: string;
  shortName: string;
  unitOfMeasureLabel: string;
  ratingsAverage: number;
  ratingsTotal: number;
  priceNormal: number;
  priceTenFor: number;
  priceTwoFor: number;
  priceCurrent: number;
  pricePercentOff: number;
  promotionCalloutText: string;
  promotionDiscountCode: string;
};

export type DealProps = {
  priceTwoFor?: number;
  priceTenFor?: number;
  pricePercentOff?: number;
};

export type CategoryParamsProps = {
  params: { urlCategory: string; urlVariety: string };
};

// before item in cart
export type AddToCartProps = {
  id: string;
  name: string;
  brand: string;
  shortName: string;
  price: number;
  quantity: number;
  deal?: DealProps;
  promotionDiscountCode?: string;
};

export type CartItemProps = {
  name: string;
  brand: string;
  shortName: string;
  price: number;
  quantity: number;
  deal?: {
    priceTwoFor?: number;
    priceTenFor?: number;
    pricePercentOff?: number;
  };
  promotionDiscountCode?: string;
  dealPrice?: number;
};

// item in cart
export type CartProps = {
  [id: string]: CartItemProps;
};

export type CategoryMainProps = {
  arr: DataProps[];
  urlCategory: string;
  urlVariety: string | undefined;
  isManage: boolean;
};

export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  css: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

export type ImgProps = {
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  imgPriority?: boolean;
};

export type ImgFillProps = {
  imgSrc: string;
  imgAlt: string;
  // imageStyle: keyof typeof styles;
  imgStyle: string;
  imgPriority?: boolean;
};

export type CampainMiniProps = {
  id: number;
  link: string;
  hdr: string;
  blurb1: string;
  blurb2: string;
  imgSrc: string;
  imgAlt: string;
};

export type ProductCartProps = {
  id: string;
  name: string;
  brand: string;
  priceCurrent: number;
  shortName: string;
  priceTwoFor: number;
  priceTenFor: number;
  pricePercentOff: number;
  packaging: string;
  promotionCalloutText?: string;
  promotionDiscountCode?: string;
  isCask: boolean;
};

export type ProductRatingProps = {
  average: number;
  total: number;
};

export type ProductReviewProps = {
  urlCategory: string;
  variety: string;
};

export type ProductInfoProps = {
  id: string;
  category: string;
  variety: string;
  brand: string;
  packaging: string;
  region: string;
  unitOfMeasureLabel: string;
  current: number;
  normal: number;
  shortName: string;
  urlCategory?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TextValueArrProps = { text: string; value: string };

export type PagingProps = { page: number; pageSize: number };

export type KeyStringProps = { [key: string]: string };

export type KeyNumberProps = { [key: string]: number };

export type KeyBooleanProps = { [key: string]: boolean };

export type FilterProps = {
  category?: string;
  price?: string;
  variety?: string;
  rating?: string;
  region?: KeyBooleanProps;
  searchId?: string;
  searchStr?: string;
};

export interface RegionFilterProps extends WineFilterProps {
  currentData: DataProps[];
}

export interface VarietyFilterProps extends WineFilterProps {
  currentData: DataProps[];
}

export interface WineFilterProps {
  updateFilters: (filters: FilterProps) => void;
  filters: FilterProps;
  isManage?: boolean;
}

export type FormStateProps = {
  message: string | null;
  // errors: Record<string, any>;
  errors: KeyStringProps;
  success: boolean | null;
};

export type CategoryBlurbProps = {
  urlCategory: string;
  variety?: string;
};

export type CarouselPagingProps = {
  items: number;
  pageIndex: number;
  setPageIndex: (prev: number) => void;
  handleClick: (prev: number) => void;
};

export type CartClosedProps = {
  totalPrice: number;
  totalQty: number;
};

export type CartQtyPriceProps = {
  totalQty: number;
  totalPrice: number;
};

export type CartPriceProps = {
  price: number;
  dealPrice?: number;
  quantity: number;
};

export type CartOpenProps = {
  totalPrice: number;
  totalQty: number;
  handleClose: () => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
};

export type ItemSavingsProps = {
  price: number;
  dealPrice?: number;
  quantity: number;
};

export type FilterListProps = {
  currentData: DataProps[];
  filters: FilterProps;
  urlVariety?: string;
  isManage: boolean;
  updateFilters: (filters: {
    searchId?: string;
    searchStr?: string;
    category?: string;
    variety?: string;
    price?: string;
    rating?: string;
  }) => void;
};

export type CategoryListProps = {
  arr: DataProps[];
  isManage?: boolean;
};

export type CategoryHeaderProps = {
  filters: FilterProps;
  removeFilters: (name: string) => void;
  dataLength: number;
  sortName: string;
  setSortName: (name: string) => void;
};

export type CategoryPagingProps = {
  currentData: DataProps[];
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

export type CategoryFooterProps = {
  currentData: DataProps[];
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

export type CategoryToggleItemsProps = {
  togglePageItems: () => void;
  isSmallScreenShowItems: boolean | undefined;
};

export type ProductDetailsProps = {
  id: string;
  name: string;
  brand: string;
  shortName: string;
  average: number;
  total: number;
  priceCurrent: number;
  priceTwoFor: number;
  priceTenFor: number;
  pricePercentOff: number;
  packaging: string;
  promotionCalloutText?: string;
  promotionDiscountCode?: string;
  urlCategory?: string;
  urlVariety?: string;
  isCask: boolean;
};

export type ProductItemProps = {
  props: {
    id: string;
    category: string;
    variety: string;
    name: string;
    shortName: string;
    brand: string;
    packaging: string;
    ratingsAverage: number;
    priceCurrent: number;
    priceNormal: number;
    priceTwoFor: number;
    pricePercentOff: number;
    priceTenFor: number;
    promotionCalloutText?: string;
    promotionDiscountCode?: string;
  };
  ind: number;
  css?: string;
};

export type PriceProps = {
  current: number;
  normal: number;
};

export type WineBlurbProps = {
  urlCategory: string | undefined;
  urlVariety: string | undefined;
};

export type ContainerProps = {
  children: ReactNode;
};

export type ddlWineItemsProps = {
  ddlWineItems: { [k: string]: string | number };
  isDelete: boolean;
};

export type ACDataProps = {
  name: string;
  id: string;
  category: string;
  variety: string;
  packaging: string;
};

export type ProductProps = {
  products: ACDataProps[];
};

export type InputFieldsProps = {
  product: DataProps;
  isDelete: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type ManageProductActionsProps = {
  enableModal: (e: React.MouseEvent<Element, MouseEvent>) => void;
  isDelete: boolean;
};

export type ModalDeleteProps = {
  id: string;
  name: string;
  initialState: FormStateProps;
  setShowModal: (show: boolean) => void;
};

export type ManageDBMessagesProps = {
  errorMessages: FormStateProps;
};

export type ManageProductProps = {
  product: DataProps;
  action: string;
  ddlWineItems: { [k: string]: string | number };
  ddlItems: { [k: string]: string | number };
};

export type ManagePageProps = {
  params: {
    action: string;
    id: string;
  };
};

export type ManageUploadProps = {
  productId: string;
  setNewImage: (newImage: string) => void;
  isDelete: boolean;
};

// TOOO: export interface ManageImageProps extends ManageUploadProps {
export interface ManageImageProps {
  productId: string;
  action: string;
  packaging: string;
  isDelete: boolean;
}

export type ManageProductsProps = {
  props: {
    id: string;
    category: string;
    variety: string;
    name: string;
    brand: string;
    priceCurrent: number;
    priceNormal: number;
  };
};

export type ManageFilterProps = {
  filters: FilterProps;
  isManage?: boolean;
};

export type ProductBreadCrumbProps = {
  urlCategory?: string;
  urlVariety?: string;
  category: string;
  variety: string;
};

export type HomeCampaignProps = {
  link: string;
  hdr: string;
  text: string;
  finePrint: string;
};

export type SelectListsProps = {
  arr: string[];
  key: string;
  value: string;
  handleChange: (key: string, value: string) => void;
};

export type SortProps = {
  sortName: string;
  setSortName: (name: string) => void;
};

export type UseCartStateProps = [
  RefObject<HTMLInputElement>,
  boolean,
  () => void,
];

export type PillsProps = {
  filters: FilterProps;
  removeFilters: (val: string) => void;
};

export type ReslutPPProps = {
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

export type InputProps = {
  children?: ReactNode;
  id: string;
  pHolder?: string;
  type?: string;
  minLen?: number;
  req?: boolean;
};

export type SignUpSchemaProps = z.ZodEffects<
  z.ZodObject<
    {
      firstName: z.ZodString;
      lastName: z.ZodString;
      email: z.ZodString;
      password: z.ZodString;
      confirmPassword: z.ZodString;
    },
    'strip',
    z.ZodTypeAny,
    {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }
  >,
  {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
>;

export type SchemaProps = z.ZodObject<
  Omit<
    {
      id: z.ZodString;
      brand: z.ZodString;
      name: z.ZodString;
      shortName: z.ZodString;
      category: z.ZodString;
      variety: z.ZodString;
      region: z.ZodString;
      packaging: z.ZodString;
      promotionCalloutText: z.ZodString;
      promotionDiscountCode: z.ZodString;
      priceNormal: z.ZodNumber;
      priceCurrent: z.ZodNumber;
      volumeMl: z.ZodNumber;
      priceTwoFor: z.ZodNumber;
      priceTenFor: z.ZodNumber;
      pricePercentOff: z.ZodNumber;
      ratingsTotal: z.ZodNumber;
      ratingsAverage: z.ZodNumber;
      unitOfMeasureLabel: z.ZodString;
    },
    'id'
  >,
  'strip',
  z.ZodTypeAny,
  {
    id?: string;
    brand: string;
    name: string;
    shortName: string;
    category: string;
    variety: string;
    region: string;
    packaging: string;
    promotionCalloutText: string;
    promotionDiscountCode: string;
    priceNormal: number;
    priceCurrent: number;
    volumeMl: number;
    priceTwoFor: number;
    priceTenFor: number;
    pricePercentOff: number;
    ratingsTotal: number;
    ratingsAverage: number;
    unitOfMeasureLabel: string;
  },
  {
    brand: string;
    name: string;
    shortName: string;
    category: string;
    variety: string;
    region: string;
    packaging: string;
    promotionCalloutText: string;
    promotionDiscountCode: string;
    priceNormal: number;
    priceCurrent: number;
    volumeMl: number;
    priceTwoFor: number;
    priceTenFor: number;
    pricePercentOff: number;
    ratingsTotal: number;
    ratingsAverage: number;
    unitOfMeasureLabel: string;
  }
>;

// export type validatedFieldsProps = {
//   success: boolean;
//   error?: { flatten: () => { fieldErrors: Record<string, string[]> } };
//   data?: any;
// };

//RTK slice
export type CartState = {
  cart: CartProps;
  priceTwoForDeals: number[];
  priceTenForDeals: number;
  promotionCode: string;
};
