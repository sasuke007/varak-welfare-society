import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getMenuItems } from "@/server/queries/menu";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuItems();

  return (
    <>
      <Header
        menuItems={menuItems.map((item) => ({
          id: item.id,
          name: item.name,
          url: item.url,
          children: item.children?.map((child) => ({
            id: child.id,
            name: child.name,
            url: child.url,
          })),
        }))}
      />
      <main className="min-h-screen pt-16 md:pt-20">{children}</main>
      <Footer />
    </>
  );
}
