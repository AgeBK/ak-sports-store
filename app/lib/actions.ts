'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { FormStateProps, SchemaProps, SignUpSchemaProps } from './definitions';

const minStr1 = z
  .string()
  .min(1, { message: 'Must be 1 or more characters long' });
const minStr2 = z
  .string()
  .min(2, { message: 'Must be 2 or more characters long' });
const gt0 = z
  .number()
  .gt(0, { message: 'Please enter an amount greater than 0.' });
const nonNeg = z.coerce.number().nonnegative();
const passwordStr = z
  .string()
  .min(6, { message: 'Must be 6 or more characters long' });

const FormSchema = z.object({
  id: z.string().min(5, { message: 'Id must be 5 or more characters long' }),
  brand: minStr1,
  name: minStr1,
  shortName: minStr1,
  category: minStr1,
  variety: minStr1,
  region: minStr1,
  packaging: minStr1,
  promotionCalloutText: z.string(),
  promotionDiscountCode: z.string(),
  priceNormal: gt0,
  priceCurrent: gt0,
  volumeMl: gt0,
  priceTwoFor: nonNeg,
  priceTenFor: nonNeg,
  pricePercentOff: nonNeg,
  ratingsTotal: nonNeg,
  ratingsAverage: nonNeg,
  unitOfMeasureLabel: z.string(),
});

const SignUpSchema = z
  .object({
    firstName: minStr2,
    lastName: minStr2,
    email: z
      .string()
      .min(5, { message: 'Email is required.' })
      .email('This is not a valid email.'),
    password: passwordStr,
    confirmPassword: passwordStr,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const UpdateSchema = FormSchema.omit({ id: true });

const validateSignUpData = (Schema: SignUpSchemaProps, formData: FormData) => {
  return Schema.safeParse({
    firstName: formData.get('fName'),
    lastName: formData.get('lName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });
};

const validateFormData = (Schema: SchemaProps, formData: FormData) => {
  return Schema.safeParse({
    id: formData.get('id'),
    brand: formData.get('brand'),
    name: formData.get('name'),
    shortName: formData.get('shortName'),
    category: formData.get('category'),
    variety: formData.get('variety'),
    region: formData.get('region'),
    packaging: formData.get('packaging'),
    promotionCalloutText: formData.get('promotionCalloutText'),
    promotionDiscountCode: formData.get('promotionDiscountCode'),
    volumeMl: Number(formData.get('volumeMl')),
    priceCurrent: Number(formData.get('priceCurrent')),
    priceNormal: Number(formData.get('priceNormal')),
    priceTwoFor: Number(formData.get('priceTwoFor')),
    priceTenFor: Number(formData.get('priceTenFor')),
    pricePercentOff: Number(formData.get('pricePercentOff')),
    ratingsTotal: Number(formData.get('ratingsTotal')),
    ratingsAverage: Number(formData.get('ratingsAverage')),
    unitOfMeasureLabel: formData.get('unitOfMeasureLabel'),
  });
};

export async function signUp(prevState: FormStateProps, formData: FormData) {
  const validatedFields = validateSignUpData(SignUpSchema, formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to sign up. Please check the fields above',
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  try {
    const data = await sql`
    SELECT count(email) 
    FROM customer 
    WHERE email=${email}
  `;
    if (data.rows[0].count > 0) {
      console.log(
        'Failed to insert new customer: email address already exists',
      );
      return {
        message: 'That email address already exists',
      };
    }
  } catch (error) {
    console.log('Failed to check if email exists: ' + error);
    return {
      message:
        'Database Error - Sorry an error has occured. Please try again later',
      //errors: JSON.parse(JSON.stringify(error)),
    };
  }

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  try {
    await sql`
    INSERT INTO "customer"(
        "first_name",
        "last_name",
        "email",
        "password"
        )

        VALUES(
          ${firstName},
          ${lastName},
          ${email},
          ${hashedPassword}
                  )`;
    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to insert new customer: ' + error);
    return {
      message: 'Database Error - Failed to insert new customer: \n' + error,
      //errors: JSON.parse(JSON.stringify(error)),
    };
  }
}

export async function addProduct(
  prevState: FormStateProps,
  formData: FormData,
) {
  const validatedFields = validateFormData(FormSchema, formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to add new product. Please check the fields above',
    };
  }

  const {
    id,
    brand,
    name,
    shortName,
    category,
    variety,
    region,
    packaging,
    volumeMl,
    promotionCalloutText,
    promotionDiscountCode,
    priceNormal,
    priceCurrent,
    priceTwoFor,
    priceTenFor,
    pricePercentOff,
    ratingsTotal,
    ratingsAverage,
    unitOfMeasureLabel,
  } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO "products" (
        "id",
        "category",
        "variety",
        "name",
        "short_name",
        "brand",       
        "region",     
        "packaging",
        "promotion_callout_text" ,
        "promotion_discount_code",
        "volume_ml" ,
        "price_normal",
        "price_current",
        "price_two_for",
        "price_ten_for",
        "price_percent_off",
        "ratings_total",
        "ratings_average",        
        "unit_of_measure_label" )

        VALUES(
          ${id}, 
          ${category},
          ${variety},
          ${name},
          ${shortName},
          ${brand},         
          ${region},
          ${packaging},
          ${promotionCalloutText},
          ${promotionDiscountCode} ,
          ${volumeMl},
          ${priceNormal},
          ${priceCurrent},
          ${priceTwoFor},
          ${priceTenFor},
          ${pricePercentOff},
          ${ratingsTotal},
          ${ratingsAverage},
          ${unitOfMeasureLabel}
        )
    `;
  } catch (error) {
    console.log('Failed to add new product: ' + error);
    return {
      message: 'Database Error - Failed to add new product: \n' + error,
      // errors: JSON.parse(JSON.stringify(error)),
    };
  }
  return {
    success: true,
  };
}

export async function updateProduct(
  id: string,
  prevState: { message: unknown },
  formData: FormData,
) {
  const validatedFields = validateFormData(UpdateSchema, formData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update product. Please check the fields above',
    };
  }

  const {
    brand,
    name,
    shortName,
    category,
    variety,
    region,
    packaging,
    volumeMl,
    promotionCalloutText,
    promotionDiscountCode,
    priceNormal,
    priceCurrent,
    priceTwoFor,
    priceTenFor,
    pricePercentOff,
    ratingsTotal,
    ratingsAverage,
    unitOfMeasureLabel,
  } = validatedFields.data;
  // Insert data into the database
  try {
    await sql`
      UPDATE products
        SET brand = ${brand},
        name = ${name},
        short_name = ${shortName},
        category = ${category},
        variety = ${variety},
        region = ${region},
        packaging = ${packaging},
        volume_ml = ${volumeMl},
        promotion_callout_text = ${promotionCalloutText},
        promotion_discount_code = ${promotionDiscountCode} ,
        price_normal = ${priceNormal},
        price_current = ${priceCurrent},
        price_two_for = ${priceTwoFor},
        price_ten_for = ${priceTenFor},
        price_percent_off = ${pricePercentOff},
        ratings_total = ${ratingsTotal},
        ratings_average = ${ratingsAverage},
        unit_of_measure_label = ${unitOfMeasureLabel}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log('Failed to update product: ' + error);
    return {
      message: 'Database Error - Failed to update product: \n' + error,
      // errors: JSON.parse(JSON.stringify(error)),
    };
  }
  return {
    success: true,
  };
}

export async function deleteProduct(id: string) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to delete product: ' + error);
    return {
      message: 'Database Error - Failed to delete product:' + error,
      // errors: JSON.parse(JSON.stringify(error)),
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    return 'success';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
