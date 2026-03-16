import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const identities = await prisma.savedIdentity.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(identities);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { data, country, label } = body;

  if (!data || !country) {
    return NextResponse.json({ error: "Missing data or country" }, { status: 400 });
  }

  const count = await prisma.savedIdentity.count({
    where: { userId: session.user.id },
  });

  if (count >= 50) {
    return NextResponse.json(
      { error: "Maximum 50 saved identities. Please delete some first." },
      { status: 400 }
    );
  }

  const identity = await prisma.savedIdentity.create({
    data: {
      userId: session.user.id,
      data,
      country,
      label: label || null,
    },
  });

  return NextResponse.json(identity, { status: 201 });
}
