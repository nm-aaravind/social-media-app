import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import SearchBar from "../../components/SearchBar";
import { FilterList } from "@mui/icons-material";
import GridPostList from "../../components/GridPostList";
import SearchResults from "../../components/SearchResults";
import { useGetPosts, useSearchPosts } from "../../lib/react-query/queries";
import useDebounce from "../../hooks/useDebounce";
import Loader from "../../components/Loader";
import { useInView } from "react-intersection-observer";
function Explore() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching: isFetchingPosts,
  } = useGetPosts();
  const [search, setSearch] = React.useState("");
  const debounceValue = useDebounce(search, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debounceValue);
  const { ref, inView } = useInView();

  React.useEffect(() => {
    document.title = "Heyo | Explore";
    if (inView && !search) fetchNextPage();
  }, [inView, search]);

  if (!posts) return <div>Loading</div>;

  const shouldShowSearchResults = search !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <Box bgcolor="primary.main" className="w-full flex flex-col items-center">
      <div className="bg-[#272727] sm:w-full xl:w-[85%] sm:px-10 md:px-14 flex flex-col">
        <div className="sm:pt-52 md:pt-60">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        {isFetchingPosts ? (
          <Loader />
        ) : (
          <div className="flex flex-col items-center">
            <div className="px-4 pt-12 flex w-full justify-between mb-6">
              <Typography variant="h4" component="h3" color="secondary">
                {shouldShowSearchResults ? "Search Results" : "Popular"}
              </Typography>
              <FilterList
                color="secondary"
                sx={{ width: "30px", height: "30px" }}
              />
            </div>
            <Divider className=" bg-white w-[99%]" />
            <div className="mt-10 px-8">
              {shouldShowSearchResults ? (
                <SearchResults
                  isSearchFetching={isSearchFetching}
                  searchedPosts={searchedPosts}
                />
              ) : shouldShowPosts ? (
                <p className="mb-32 w-96 h-96 bg-white">End of content</p>
              ) : (
                <GridPostList posts={posts} toDisplay={"explore"} />
              )}
            </div>
          </div>
        )}
        {hasNextPage && !search ? (
          <div ref={ref} className="mb-28 -mt-10">
            <Loader />
          </div>
        ) : (
          <p className="w-full mb-28 -mt-16 text-center">
            <Typography
              fontFamily="Varela Round"
              align="center"
              variant="p"
              color="secondary"
              className="sm:text-3xl md:text-5xl"
            >
              Thats all to show!
            </Typography>
          </p>
        )}
      </div>
    </Box>
  );
}

export default Explore;
