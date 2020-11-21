import React from "react";
import { Box } from "@app/components/atoms/Box";
import { Layout } from "@app/components/molecules/Layout";

export default function Home() {
  return (
    <Layout>
      <Box pt={50} bg="red">Hello world!</Box>
    </Layout>
  );
}
