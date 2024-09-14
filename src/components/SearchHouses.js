import React, { useState } from 'react'
import housegenerator from '../functions/housegenerator'
import '../css/search.css'

export default function SearchHouses() {

  console.log(housegenerator(100))

  return (
    <div className='SearchWindow'>
      <div className='SearchBanner'>
        <span className='SearchBar'>
          <input placeholder='Find you dream home!'></input>
          <span class='SearchButton'>
            <svg xmlns="http://www.w3.org/2000/svg" width=".9em" height=".9em" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </span>
        </span>
      </div>
      <div>

      </div>
    </div>
  )
}