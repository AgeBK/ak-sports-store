import { sql } from "@vercel/postgres";
import { DataProps } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { camelise, cameliseArr, sentenceCase } from "./utils";

export async function fetchProducts() {
  // noStore() prevents the response from being cached. (good for dev) TODO
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes2
      `;

    const shoes2 = data.rows;
    // shoes2.reverse();
    return cameliseArr(shoes2);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes2.");
  }
}

export async function fetchProductById(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *       
      FROM shoes2
      WHERE id=${query}
      `;

    const product = data.rows[0];
    console.log("fetchProductById");
    console.log("query: " + query);
    console.log("product");
    console.log(product);

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
      FROM shoes2
      WHERE category=${query}
      `;

    const shoes2 = data.rows;
    return cameliseArr(shoes2); // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes2 by category.");
  }
}

export async function fetchProducstByCatSubCat(
  category: string,
  subCategory: string
) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes2
      WHERE category=${sentenceCase(category)}
      AND sub_category=${sentenceCase(subCategory)}
      `;

    const shoes2 = data.rows;
    return cameliseArr(shoes2); // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes2 by sub category.");
  }
}

export async function fetchProductsPriceDrop() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes2
      WHERE percentage > 0
      `;

    const shoes2 = data.rows;
    return cameliseArr(shoes2);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes2 price drop.");
  }
}

export async function fetchCarouselProducts() {
  noStore();
  // fetch 12 random shoes2 that are on sale
  try {
    const data = await sql<DataProps>`
      SELECT * FROM shoes2 
      WHERE percentage > 0
      LIMIT 12
      `;

    const shoes2 = data.rows;
    return cameliseArr(shoes2);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch carousel shoes2.");
  }
}

export async function fetchCarouselProductsByVariety(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT * FROM shoes2 
      WHERE variety=${query}
      LIMIT 12
      `;

    const shoes2 = data.rows;
    return cameliseArr(shoes2);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch carousel shoes2 by variety.");
  }
}
