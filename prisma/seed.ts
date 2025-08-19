import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Grab existing users (you said you already have 2)
  const users = await prisma.user.findMany();

  if (users.length < 2) {
    throw new Error(
      "❌ You need at least 2 users in the DB before seeding listings/reservations."
    );
  }

  const [user1, user2] = users;

  // Seed Listings
  const listing1 = await prisma.listing.create({
    data: {
      title: "Cozy Apartment in London",
      description: "A lovely apartment in the heart of London.",
      imageSrc: "https://picsum.photos/800/400?random=1",
      category: "Apartment",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 3,
      locationValue: "London, UK",
      userId: user1.id,
      price: 120.0,
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      title: "Luxury Beach Villa",
      description: "Enjoy the ocean views and private pool.",
      imageSrc: "https://picsum.photos/800/400?random=2",
      category: "Villa",
      roomCount: 5,
      bathroomCount: 4,
      guestCount: 10,
      locationValue: "Malibu, USA",
      userId: user2.id,
      price: 800.0,
    },
  });

  // Seed Reservations
  await prisma.reservation.create({
    data: {
      userId: user2.id,
      listingId: listing1.id,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-09-05"),
      totalPrice: 480.0, // 4 nights * 120
    },
  });

  await prisma.reservation.create({
    data: {
      userId: user1.id,
      listingId: listing2.id,
      startDate: new Date("2025-10-10"),
      endDate: new Date("2025-10-15"),
      totalPrice: 4000.0, // 5 nights * 800
    },
  });

  console.log("✅ Seed completed!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
