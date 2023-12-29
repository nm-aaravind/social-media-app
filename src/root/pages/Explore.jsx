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
import { useInfiniteQuery } from '@tanstack/react-query'
import Loader from '../../components/Loader'
function Explore() {
  const { data: posts, fetchNextPage, hasNextPage, isPending, isFetching } = useGetPosts()
  const [search, setSearch] = React.useState('')
  const debounceValue = useDebounce(search, 500)
  const { data: searchedPosts } = useSearchPosts()

  if (!posts) return <div>Loading</div>

  console.log(posts)

  const shouldShowSearchResults = search !== ''
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item.documents.length === 0)
  const [offset] = useOutletContext()
  return (
    <Box bgcolor='primary.main' className='w-full flex justify-center'>
      <PageHeader offset={offset} heading="Explore" />
      <div className='sm:w-full xl:w-[85%] sm:px-10 md:px-14 flex flex-col gap-10'>
        <div className='pt-52'>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div className='flex flex-col'>
          <div className='p-2 flex justify-between'>
            <Typography variant='h4' component='h3' color='secondary'>Popular</Typography>
            <FilterList color='secondary' sx={{ width: '30px', height: '30px' }} />
          </div>
          <div className='mt-10'>
            {
              shouldShowSearchResults ? <SearchResults /> :
                shouldShowPosts ? <p>End of content</p> :
                  posts.pages.map((item, index) => <GridPostList key={index} posts={item.documents} />)
            }
          </div>
        </div>
      </div>
    </Box>
  )
}

export default Explore