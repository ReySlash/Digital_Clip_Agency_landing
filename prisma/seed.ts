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

  const portfolioItems = [
    {
      title: "Como logre salir de Cuba sin pagar nada",
      platform: "YouTube",
      thumbnail: "https://i.ytimg.com/vi/D8u3r_vhjJk/hqdefault.jpg",
      href: "https://www.youtube.com/watch?v=D8u3r_vhjJk",
      description:
        "Historia personal contada con edicion enfocada en claridad narrativa, ritmo visual y retencion en formato largo.",
      featured: true,
      published: true,
      sortOrder: 1,
    },
    {
      title: "Mi trabajo en Qatar salario realidad y lo dificil",
      platform: "YouTube",
      thumbnail: "https://i.ytimg.com/vi/3GLKHEpMtpE/hqdefault.jpg",
      href: "https://www.youtube.com/watch?v=3GLKHEpMtpE",
      description:
        "Video testimonial con estructura directa, cortes limpios y edicion pensada para sostener interes durante toda la historia.",
      featured: true,
      published: true,
      sortOrder: 2,
    },
    {
      title: "Mi historia por que decidi irme de Cuba",
      platform: "YouTube",
      thumbnail: "https://i.ytimg.com/vi/GW6iqJYiv0Y/hqdefault.jpg",
      href: "https://www.youtube.com/watch?v=GW6iqJYiv0Y&t=117s",
      description:
        "Relato personal editado para reforzar emocion, continuidad visual y conexion con la audiencia desde el inicio.",
      featured: false,
      published: true,
      sortOrder: 3,
    },
  ];

  for (const portfolioItem of portfolioItems) {
    await prisma.portfolioItem.create({
      data: portfolioItem,
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
