import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

if (process.env.NODE_ENV === "production") {
  throw new Error("Seeding is disabled in production.");
}

const connectionString = process.env.DATABASE_URL;
const seedAdminEmail = process.env.SEED_ADMIN_EMAIL;
const seedAdminPassword = process.env.SEED_ADMIN_PASSWORD;
const seedAdminName = process.env.SEED_ADMIN_NAME ?? "Digital Clip Admin";

if (!connectionString) {
  throw new Error("DATABASE_URL is required to run the Prisma seed.");
}

if (!seedAdminEmail || !seedAdminPassword) {
  throw new Error(
    "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required to seed the admin user.",
  );
}

const adminEmail = seedAdminEmail;
const adminPassword = seedAdminPassword;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: seedAdminName,
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
    create: {
      name: seedAdminName,
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
  });

  const portfolioItems = [
    {
      titleES: "Como logre salir de Cuba sin pagar nada",
      titleEN: "How I managed to leave Cuba without paying anything",
      platform: "YouTube",
      thumbnail: "https://i.ytimg.com/vi/D8u3r_vhjJk/hqdefault.jpg",
      href: "https://www.youtube.com/watch?v=D8u3r_vhjJk",
      descriptionES:
        "Historia personal contada con edicion enfocada en claridad narrativa, ritmo visual y retencion en formato largo.",
      descriptionEN:
        "Personal story edited with a focus on narrative clarity, visual rhythm, and retention for long-form content.",
      featured: true,
      published: true,
      sortOrder: 1,
    },
    {
      titleES: "Mi trabajo en Qatar salario realidad y lo dificil",
      titleEN: "My work in Qatar: salary, reality, and the hard part",
      platform: "YouTube",
      thumbnail: "https://i.ytimg.com/vi/3GLKHEpMtpE/hqdefault.jpg",
      href: "https://www.youtube.com/watch?v=3GLKHEpMtpE",
      descriptionES:
        "Video testimonial con estructura directa, cortes limpios y edicion pensada para sostener interes durante toda la historia.",
      descriptionEN:
        "Testimonial video with direct structure, clean cuts, and editing designed to sustain interest through the full story.",
      featured: true,
      published: true,
      sortOrder: 2,
    },
    {
      titleES: "Mi historia por que decidi irme de Cuba",
      titleEN: "My story: why I decided to leave Cuba",
      platform: "YouTube",
      thumbnail: "https://i.ytimg.com/vi/GW6iqJYiv0Y/hqdefault.jpg",
      href: "https://www.youtube.com/watch?v=GW6iqJYiv0Y&t=117s",
      descriptionES:
        "Relato personal editado para reforzar emocion, continuidad visual y conexion con la audiencia desde el inicio.",
      descriptionEN:
        "Personal narrative edited to reinforce emotion, visual continuity, and audience connection from the start.",
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
