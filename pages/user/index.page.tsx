import { useRouter } from "next/router";
import React from "react";

function test() {
  const router = useRouter();
  console.log("router", router, router.query);
  return <div>test</div>;
}

export default test;
