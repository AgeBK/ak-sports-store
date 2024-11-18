import { sql } from "@vercel/postgres";
import { DataProps } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { camelise, cameliseArr } from "./utils";

export async function fetchProducts() {
  // noStore() prevents the response from being cached. (good for dev) TODO
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes
      `;

    const shoes = data.rows;
    // shoes.reverse();
    return cameliseArr(shoes);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes.");
  }
}

export async function fetchProductById(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT 
        "id",
        "name",
        "brand",
        "category",
        "variety",
        "short_name",
        "region",
        "packaging",
        "promotion_callout_text",
        "promotion_discount_code",
        "unit_of_measure_label",
        "price_normal",
        "price_current",
        "price_ten_for",
        "price_two_for",
        "price_percent_off",
        "volume_ml",
        "ratings_total",
        "ratings_average"        
      FROM shoes
      WHERE id=${query}
      `;

    const product = data.rows[0];
    return product ? camelise(product) : undefined; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch product by id.");
  }
}

export async function fetchProductsByCategory(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes
      WHERE category=${query}
      `;

    const shoes = data.rows;
    return cameliseArr(shoes); // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes by category.");
  }
}

export async function fetchProductsBySubCateogory(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes
      WHERE subCategory=${query}
      `;

    const shoes = data.rows;
    return cameliseArr(shoes); // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes by sub category.");
  }
}

export async function fetchProductsPriceDrop() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes
      WHERE percentage > 0
      `;

    const shoes = data.rows;
    return cameliseArr(shoes);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes price drop.");
  }
}

export async function fetchCarouselProducts() {
  noStore();
  // fetch 12 random shoes that are on sale
  try {
    const data = await sql<DataProps>`
      SELECT * FROM shoes 
      WHERE percentage > 0
      LIMIT 12
      `;

    const shoes = data.rows;
    return cameliseArr(shoes);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch carousel shoes.");
  }
}

export async function fetchCarouselProductsByVariety(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT * FROM shoes 
      WHERE variety=${query}
      LIMIT 12
      `;

    const shoes = data.rows;
    return cameliseArr(shoes);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch carousel shoes by variety.");
  }
}
