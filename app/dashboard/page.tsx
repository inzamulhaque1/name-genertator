import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const identities = await prisma.savedIdentity.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <DashboardClient
      identities={identities.map((i) => ({
        id: i.id,
        label: i.label,
        country: i.country,
        data: i.data as Record<string, string>,
        createdAt: i.createdAt.toISOString(),
      }))}
      userName={session.user.name || "User"}
    />
  );
}
