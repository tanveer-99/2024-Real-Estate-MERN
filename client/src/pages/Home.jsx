import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingCard from '../components/ListingCard';

const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(offerListings)

  useEffect(()=> {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListing = async ()=> {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListing = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOfferListing();
  }, [])
  return (
    <div className=''>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className='text-slate-700 font-bold font-3xl lg:text-6xl'>Find Your Next <span className='text-slate-500'>Perfect</span> <br /> Place With Ease</h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          MDH Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link className='text-xs sm:text-sm text-blue-800 font-bold hover:underline' to='/search'>Let's Get Started...</Link>
      </div>
      
      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && (
            offerListings.map(listing => (
              <SwiperSlide key={listing._id}>
                <div style={{background: `url(${listing.imageURLs[0]}) center no-repeat`, backgroundSize: 'cover'}} className='h-[500px]' >

                </div>
              </SwiperSlide>
            ))
          )
        }
      </Swiper>
      <div className='max-w-6xl mx-autp p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Offer</h2>
              <Link className='text-sm text-blue-800 hover:underline' to='/search?offer=true'>Show More Offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map(listing => (
                <ListingCard key={listing._id} listing={listing}></ListingCard>
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Places For Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to='/search?type=rent'>Show More Places For Rent</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map(listing => (
                <ListingCard key={listing._id} listing={listing}></ListingCard>
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Places For Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to='/search?type=sale'>Show More Places For Sale</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map(listing => (
                <ListingCard key={listing._id} listing={listing}></ListingCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home