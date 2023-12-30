import { Box, Paper, Typography, TextField } from '@mui/material'
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import SearchBar from '../../components/SearchBar'
import { FilterList } from '@mui/icons-material'
import GridPostList from '../../components/GridPostList'
import SearchResults from '../../components/SearchResults'
import { useGetPosts, useSearchPosts } from '../../lib/react-query/queries'
import useDebounce from '../../hooks/useDebounce'
import Loader from '../../components/Loader'
import { useInView } from 'react-intersection-observer'
function Explore() {
  const { data: posts, fetchNextPage, hasNextPage, isPending, isFetching } = useGetPosts()
  const [search, setSearch] = React.useState('')
  const debounceValue = useDebounce(search, 500)
  const { data: searchedPosts, isPending: isSearchFetching } = useSearchPosts(debounceValue)
  console.log(searchedPosts, "Searched posts")
  const [offset] = useOutletContext()
  const { ref, inView } = useInView();
  console.log(hasNextPage, "HASNEXT")
  React.useEffect(() => {
    if (inView && !search) fetchNextPage();
  }, [inView, search])

  if (!posts) return <div>Loading</div>

  console.log(posts)

  const shouldShowSearchResults = search !== ''
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item.documents.length === 0)
  return (
    <Box bgcolor='primary.main' className='w-full flex flex-col items-center'>
      {/* <PageHeader offset={offset} heading="Explore" /> */}
      <div className='bg-[#272727] sm:w-full xl:w-[85%] sm:px-10 md:px-14 flex flex-col'>
        <div className='pt-56'>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div className='flex flex-col'>
          <div className='px-4 pt-12 flex justify-between'>
            <Typography variant='h4' component='h3' color='secondary'>Popular</Typography>
            <FilterList color='secondary' sx={{ width: '30px', height: '30px' }} />
          </div>
          <div className='mt-10'>
            {
              shouldShowSearchResults ? <SearchResults isSearchFetching={isSearchFetching} searchedPosts={searchedPosts} /> :
                shouldShowPosts ? <p className='mb-32 w-96 h-96 bg-white'>End of content</p> :
                  <GridPostList posts={posts} toDisplay={'explore'}/>
            }
          </div>
        </div>
        { hasNextPage && !search ?
          <div ref={ref} className='mb-28 -mt-10'>
            <Loader />
          </div> : <p className='w-full mb-24 -mt-10 pb-10 text-center'><Typography align='center' variant='h4' color='secondary'>Thats all to show !</Typography></p>
        }
      </div>
    </Box>
  )
}

export default Explore