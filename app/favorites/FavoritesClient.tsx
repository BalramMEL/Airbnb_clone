
import { SafeListing, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'

interface FavoritesClientProps{
    listings: SafeListing[],
    currentUser?: SafeUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
  return (
      <Container>
          <Heading
              title='Favorites'
              subtitle='List of your favorites!'
          />
          <div>
                {
                  listings.map((listing: any) => (
                      <ListingCard
                          currentUser={currentUser}
                          key={listing.id}
                          data={listing}
                      />
                  ))
                }
          </div>      

    </Container>
  )
}

export default FavoritesClient