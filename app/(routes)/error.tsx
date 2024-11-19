"use client";

import ErrorMain from "@/app/ui/error-main";
import data from "@/app/lib/appData.json";

export default function Error() {
  console.log("Error");

  // if db error occurs
  // const { errorMsg } = data;
  // return <ErrorMain message={errorMsg} />;
  return "Error Component";
}
