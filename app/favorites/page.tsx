import React from 'react'
import getFavoriteListings from '../actions/getFavoriteListings'
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import FavoritesClient from './FavoritesClient';

const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No Favorites Found'
                    subtitle="Looks like you have no favorites listings"
                />
            </ClientOnly>
        )
    }

  return (
      <ClientOnly>
          <FavoritesClient
              listings={listings}
              currentUser={currentUser}
          />
    </ClientOnly>
  )
}

export default ListingPage
