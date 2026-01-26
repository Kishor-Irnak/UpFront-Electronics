import data from "@/data.json";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return data.products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const resolvedParams = await params;
  const product = data.products.find(
    (p) => p.id === parseInt(resolvedParams.id),
  );

  if (!product) {
    notFound();
  }

  return <ProductClient product={product as any} params={resolvedParams} />;
}
