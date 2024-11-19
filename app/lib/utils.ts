import { DataProps } from "./definitions";
import {
  fetchProductsByCategory,
  fetchProductsPriceDrop,
} from "@/app/lib/data";

const capitalizeFirstLetter = (string: string) => {
  // string can be multiple words
  const wordsArr = string
    .split(" ")
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1));
  return wordsArr.join(" ");
};

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const fetchCategoryPageData = async (arg1: string, arg2?: string) => {
  let arr: DataProps[] = [];
  if (arg2) {
    switch (arg1) {
      case "white":
      case "red":
      case "sparkling":
        arr = await fetchProductsByCategoryAndVariety(
          capitalizeFirstLetter(arg1),
          capitalizeFirstLetter(arg2)
        );
        break;
      default:
        break;
    }
  } else {
    switch (arg1) {
      case "price-drop":
        arr = await fetchProductsPriceDrop();
        break;
      case "mens":
      case "womens":
      case "kids":
        arr = await fetchProductsByCategory(capitalizeFirstLetter(arg1));
        break;
      default:
        break;
    }
  }
  return arr;
};

const camelise = (product: DataProps) => {
  // convert keys names in object from underscore to camel case (from db to React friendly)
  const camelCased = Object.entries(product).reduce((acc, val) => {
    const value = val[1];
    const key = val[0].replace(/_([a-z])/g, (str) => {
      return str[1].toUpperCase();
    });
    acc = { ...acc, [key]: value };
    return acc;
  }, {} as DataProps);
  return camelCased;
};

const cameliseArr = (products: DataProps[]) =>
  products.map((val) => camelise(val));

const deCamelise = (s: string) => {
  const result = s.replace(/([A-Z])/g, " $1"); // note: space before $
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const sentenceCase = (s: string) => {
  return s.replace(
    /\w\S*/g,
    (text: string) =>
      text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

export {
  fetchCategoryPageData,
  capitalizeFirstLetter,
  camelise,
  deCamelise,
  cameliseArr,
  sentenceCase,
};
