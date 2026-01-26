import OrderClient from "./OrderClient";

export async function generateStaticParams() {
  // Since order IDs are generated at runtime, we pre-generate a "success" page
  // and a few sample IDs to satisfy the static export requirements.
  return [{ id: "success" }, { id: "12345" }];
}

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const resolvedParams = await params;
  return <OrderClient params={resolvedParams} />;
}
