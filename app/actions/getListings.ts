import prisma from "@/app/libs/prismadb";

interface IListingsParams{
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: number;
    endDate?: number;
    locationValue?: number;
    category?: number;
}

export default async function getListings(
    params: IListingsParams
) {
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = roomCount;
        }

        if (guestCount) {
            query.guestCount = guestCount;
        }

        if (bathroomCount) {
            query.bathroomCount = bathroomCount;
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
            reservations: {
            some: {
                OR: [
                {
                    endDate: { gte: startDate },
                    startDate: { lte: startDate }
                },
                {
                    startDate: { lte: endDate },
                    endDate: { gte: endDate }
                }
            ]
          }
        }
      }
    }      

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;

    }
    catch (error: any) {
        throw new Error(error);
    }
}