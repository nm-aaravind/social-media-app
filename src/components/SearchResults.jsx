import React from 'react'
import Loader from './Loader'
import GridPostList from './GridPostList'

const SearchResults = ({ isSearchFetching, searchedPosts }) => {
  if(isSearchFetching) return <Loader />
  if(searchedPosts?.documents.length > 0){
    return (
      <GridPostList posts={searchedPosts.documents} toDisplay={'search'} />
    )
  }
  return (
    <div className='text-white text-3xl'>No results found </div>
  )
}

export default SearchResults