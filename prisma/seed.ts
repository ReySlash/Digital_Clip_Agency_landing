import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to run the Prisma seed.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPasswordHash = await bcrypt.hash("ChangeMe_Admin_123!", 12);
  const devPasswordHash = await bcrypt.hash("ChangeMe_Dev_123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@digitalclipagency.com" },
    update: {
      name: "Digital Clip Admin",
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
    create: {
      name: "Digital Clip Admin",
      email: "admin@digitalclipagency.com",
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "dev@digitalclipagency.com" },
    update: {
      name: "Digital Clip Dev",
      passwordHash: devPasswordHash,
      role: UserRole.DEV,
    },
    create: {
      name: "Digital Clip Dev",
      email: "dev@digitalclipagency.com",
      passwordHash: devPasswordHash,
      role: UserRole.DEV,
    },
  });

  const projects = [
    {
      title: "Reels para marca personal",
      slug: "reels-marca-personal",
      shortDescription:
        "Edicion vertical enfocada en ritmo, subtitulos y retencion para Instagram.",
      thumbnailUrl: "/portfolio/placeholder-1.jpg",
      videoUrl: "https://www.instagram.com/",
      featured: true,
      published: true,
      sortOrder: 1,
    },
    {
      title: "YouTube storytelling edit",
      slug: "youtube-storytelling-edit",
      shortDescription:
        "Montaje narrativo para videos largos con enfoque cinematico y pacing claro.",
      thumbnailUrl: "/portfolio/placeholder-2.jpg",
      videoUrl: "https://www.youtube.com/",
      featured: true,
      published: true,
      sortOrder: 2,
    },
    {
      title: "TikTok product teaser",
      slug: "tiktok-product-teaser",
      shortDescription:
        "Pieza corta para lanzamiento de producto optimizada para consumo movil.",
      thumbnailUrl: "/portfolio/placeholder-3.jpg",
      videoUrl: "https://www.tiktok.com/",
      featured: false,
      published: false,
      sortOrder: 3,
    },
  ];

  for (const project of projects) {
    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
