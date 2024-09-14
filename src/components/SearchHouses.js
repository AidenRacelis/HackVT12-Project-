import React, { useState } from 'react'
import housegenerator from '../functions/housegenerator'
import '../css/search.css'

function formatString(str) {
  return str
    .replace(/_/g, ' ')
    .replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
}

export default function SearchHouses() {

  console.log(housegenerator(100))
  var house_list = housegenerator(100)

  return (
    <div className='SearchWindow'>
      <div className='SearchBanner'>
        <span className='SearchBar'>
          <input placeholder='Your dream home is one click away...'></input>
          <span className='SearchButton'>
            <svg xmlns="http://www.w3.org/2000/svg" width=".9em" height=".9em" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </span>
        </span>
      </div>
      <div className='DisplayHouses'>
        {/* <div className='HouseDiv' value={`${house_list[0].home_type}`}> */}
          {/* <img className='HouseImg' src='../assets/House-Modern.png'></img> */}
          {/* <span className='price' value={`${house_list[0].price}`}>${house_list[0].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span> */}
          {/* <span className='list_item'>{house_list[0].size} Sq Ft</span> */}
          {/* <span className='list_item'>{house_list[0].bedrooms} bed, {house_list[0].bathrooms} bath</span> */}
          {/* <span className='list_item'>{house_list[0].parking_am} Car Parking</span> or if house_list[0].parking_garage is true then <span className='list_item'>{house_list[0].parking_am} Car Garage</span> */}
          {/* <span className='list_item'>{formatString(house_list[0].setting)}</span> */}
          {/*if house_list[0].schools (great, good, mid, poor, bad) is true then <span className='list_item'>star emoji for each, 1 for bad, 5 for good</span>*/}
          {/*if house_list[0].gated is true then <span className='list_item'>{house_list[0].gated}</span>*/}
          {/*if house_list[0].pool is true then <span className='list_item'>{house_list[0].pool}</span>*/}
          {/*if house_list[0].AC and/or house_list[0].heat are true then <span className='list_item'>A/C, Heat</span>*/}
          {/*if house_list[0].pool is true then <span className='list_item'>{house_list[0].pool}</span>*/}
        {/* </div> */}
        {house_list.map((house, index) => (
        <div key={index} className='HouseDiv' value={`${house.home_type}`}>
          <img className='HouseImg' src='../assets/House-Modern.png' alt='House'></img>
          
          <span className='price' value={`${house.price}`}>
            ${house.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          
          <span className='list_item'>{house.size} Sq Ft</span>
          <span className='list_item'>{house.bedrooms} bed, {house.bathrooms} bath</span>
          
          {house.parking_garage ? (
            <span className='list_item'>{house.parking_am} Car Garage</span>
          ) : (
            <span className='list_item'>{house.parking_am} Car Parking</span>
          )}

          <span className='list_item'>{formatString(house.setting)}</span>

          {/* Display stars for school rating */}
          {house.schools && (
            <span className='list_item'>
              {"★".repeat(house.schools)} {/* Repeat stars based on school rating */}
            </span>
          )}

          {house.gated && <span className='list_item'>Gated Community</span>}

          {house.pool && <span className='list_item'>Pool</span>}

          {(house.AC || house.heat) && (
            <span className='list_item'>
              {house.AC ? 'A/C' : ''}{house.AC && house.heat ? ', ' : ''}{house.heat ? 'Heat' : ''}
            </span>
          )}
        </div>
      ))}
      </div>
    </div>
  )
}