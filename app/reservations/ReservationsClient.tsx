'use client'

import React, { useCallback, useState } from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { SafeReservation, SafeUser } from '../types'
import { useRouter } from 'next/navigation';
import ListingCard from '../components/listings/ListingCard';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ReservationsClientProps{
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation Cancelled")
        router.refresh();
      })
      .catch(() => {
      toast.error("Something went wrong!")
      })
      .finally(() => {
      setDeletingId('');
    })
  },[router])

  return (
    <Container>
      <Heading
        title='Reservations'
        subtitle='Bookings on your property'
      />

      <div
        className='
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
      '>
        {
          reservations.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              actionLabel='Cancel guest reservation'
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              currentUser={currentUser}
            />
          ))
        }
      </div>
    </Container>
  )
}

export default ReservationsClient