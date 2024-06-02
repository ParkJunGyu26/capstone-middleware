import { PrismaService } from '../prisma.service';

async function main() {
  const prismaService = new PrismaService();
  await prismaService.clearTotalTable();
  await prismaService.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
