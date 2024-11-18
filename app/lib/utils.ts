import { DataProps, FilterProps } from './definitions';
import {
  fetchProductsByCategory,
  fetchProductsPriceTwoFor,
  fetchProductsBySearchTerm,
  fetchProductsByBrand,
  fetchProductsByCategoryAndVariety,
  fetchProductsPriceTwoForDeals,
  fetchProductsPriceTenPercentOff,
  fetchProductsTenAndLess,
  fetchProductsPriceTenFor100,
  fetchProductsPriceDrop,
  fetchCarouselProductsByVariety,
  fetchCarouselProducts,
} from '@/app/lib/data';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const fetchCategoryPageData = async (arg1: string, arg2?: string) => {
  let arr: DataProps[] = [];
  if (arg2) {
    switch (arg1) {
      case 'white':
      case 'red':
      case 'sparkling':
        arr = await fetchProductsByCategoryAndVariety(
          capitalizeFirstLetter(arg1),
          capitalizeFirstLetter(arg2),
        );
        break;
      default:
        break;
    }
  } else if (
    // filter by 2 for XX deals
    arg1.startsWith('two-for') &&
    arg1 !== 'two-for-deals'
  ) {
    const price = Number(arg1.split('-')[2]);
    arr = await fetchProductsPriceTwoFor(price);
  } else if (arg1.startsWith('search')) {
    const searchTerm = arg1.replace('search%3D', '');
    arr = await fetchProductsBySearchTerm(searchTerm);
  } else if (arg1.startsWith('brand')) {
    const brandName = capitalizeFirstLetter(
      deHyphenate(arg1.replace('brand%3D', '')) as string,
    );
    arr = await fetchProductsByBrand(brandName);
  } else {
    switch (arg1) {
      case 'two-for-deals':
        arr = await fetchProductsPriceTwoForDeals();
        break;
      case 'ten-percent-off':
        arr = await fetchProductsPriceTenPercentOff();
        break;
      case 'ten-and-less':
        arr = await fetchProductsTenAndLess();
        break;
      case 'ten-for-100':
        arr = await fetchProductsPriceTenFor100();
        break;
      case 'price-drop':
        arr = await fetchProductsPriceDrop();
        break;
      case 'white':
      case 'red':
      case 'sparkling':
        arr = await fetchProductsByCategory(capitalizeFirstLetter(arg1));
        break;
      default:
        break;
    }
  }
  return arr;
};

const fetchCarouselData = async (variety?: string) => {
  let carouselProducts: DataProps[] = [];
  if (variety) {
    carouselProducts = await fetchCarouselProductsByVariety(variety);
  } else {
    carouselProducts = await fetchCarouselProducts();
  }
  return carouselProducts;
};

const capitalizeFirstLetter = (string: string) => {
  // string can be multiple words
  const wordsArr = string
    .split(' ')
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1));
  return wordsArr.join(' ');
};

const hyphenate = (str: string | undefined) =>
  typeof str === 'string' ? str.toLowerCase().replace(/ /gi, '-') : undefined;

const deHyphenate = (str: string) =>
  typeof str === 'string' ? str.toLowerCase().replace(/-/gi, ' ') : undefined;

const checkDeals = (
  priceTwoFor: number,
  priceTenFor: number,
  pricePercentOff: number,
) => {
  const twoFor = Number(priceTwoFor);
  const tenFor = Number(priceTenFor);
  const percentOff = Number(pricePercentOff);
  let deal = {};
  if (twoFor) {
    deal = { priceTwoFor: twoFor };
  } else if (tenFor) {
    deal = { priceTenFor: tenFor };
  } else if (percentOff) {
    deal = { pricePercentOff: percentOff };
  }
  return deal;
};

const alphabetically = (arr: DataProps[], reverseOrder: boolean) => {
  arr.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
  if (reverseOrder) arr.reverse();
  return arr;
};

const financially = (arr: DataProps[], reverseOrder: boolean) => {
  arr.sort((a, b) => (a.priceCurrent < b.priceCurrent ? -1 : 1));
  if (reverseOrder) arr.reverse();
  return arr;
};

const saleItemsFirst = (arr: DataProps[]) => {
  arr.sort(({ priceCurrent, priceNormal }) =>
    priceCurrent < priceNormal ? -1 : 1,
  );
  return arr;
};

const sortCategoryPageData = (arr: DataProps[], value: string) => {
  switch (value) {
    case 'a-z':
      arr = alphabetically(arr, false);
      break;
    case 'z-a':
      arr = alphabetically(arr, true);
      break;
    case '$':
      arr = financially(arr, false);
      break;
    case '$$$':
      arr = financially(arr, true);
      break;
    case 'sale':
    case 'relevance':
      arr = saleItemsFirst(arr);
      break;
    default:
      break;
  }
  return arr;
};

const filterCategoryPageData = (arr: DataProps[], filters: FilterProps) => {
  const { searchId, searchStr, category, variety, price, rating, region } =
    filters;

  if (searchId) {
    arr = arr.filter(({ id }) => id.startsWith(searchId));
  }

  if (searchStr) {
    arr = arr.filter(
      ({ name, brand }) =>
        name.toLowerCase().indexOf(searchStr) > -1 ||
        brand.toLowerCase().indexOf(searchStr) > -1,
    );
  }

  if (category) {
    arr = arr.filter(({ category: wineCategory }) => wineCategory === category);
  }

  if (variety) {
    arr = arr.filter(({ variety: wineVariety }) => wineVariety === variety);
  }

  if (price) {
    const [min, max] = price.split('-');
    arr = arr.filter(
      ({ priceCurrent }) =>
        priceCurrent >= Number(min) && priceCurrent < Number(max),
    );
  }

  if (rating) {
    arr = arr.filter(
      ({ ratingsAverage }) => Math.round(ratingsAverage) === Number(rating),
    );
  }

  if (region) {
    const checked = Object.keys(region).filter((key) => region[key]);
    if (checked.length) {
      arr = arr.filter(({ region }) => checked.includes(region));
    }
  }
  return arr;
};

const validateImage = async (strUrl: string) => {
  try {
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = strUrl;
      img.onload = () => resolve(strUrl);
      img.onerror = () => {
        reject();
      };
    });
    return true;
  } catch {
    return false;
  }
};

const uploadImg = async (file: Blob, productId: string) => {
  const fileName: string = `${productId}.webp`;
  const formData = new FormData();
  formData.append('file', file, fileName);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    return true;
  } else {
    console.log('ManageUpload image FAILED');
    return false;
  }
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
  const result = s.replace(/([A-Z])/g, ' $1'); // note: space before $
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export {
  capitalizeFirstLetter,
  hyphenate,
  deHyphenate,
  fetchCategoryPageData,
  checkDeals,
  sortCategoryPageData,
  filterCategoryPageData,
  fetchCarouselData,
  validateImage,
  uploadImg,
  camelise,
  cameliseArr,
  deCamelise,
};
