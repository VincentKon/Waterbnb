import { Listing, Reservation, User } from "../generated/prisma";

export type SafeListing = Omit<Listing, "createdAt" | "price"> & {
  createdAt: string;
  price: number;
};
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing" | "totalPrice"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
