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
        <div className='HouseDiv' value={`${house_list[0].home_type}`}>
          <img className='HouseImg' src='../assets/House-Modern.png'></img>
          <span className='price' value={`${house_list[0].price}`}>${house_list[0].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>
          <span className='list_item'>{house_list[0].size} Sq Ft</span>
          <span className='list_item'></span>
          <span className='list_item'>{formatString(house_list[0].setting)}</span>
        </div>
        <div className='HouseDiv' value={`${house_list[0].home_type}`}>
          <img className='HouseImg' src='../assets/House-Modern.png'></img>
          <span className='price' value={`${house_list[0].price}`}>${house_list[0].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>
          <span className='list_item'>{house_list[0].size} Sq Ft</span>
          <span className='list_item'>{formatString(house_list[0].setting)}</span>
        </div>
      </div>
    </div>
  )
}