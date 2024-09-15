import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import SearchBar from "../../components/SearchBar";
import GridPostList from "../../components/GridPostList";
import { useGetPosts,  } from "../../lib/react-query/queries";
import Loader from "../../components/Loader";
import { useInView } from "react-intersection-observer";
function Explore() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetPosts();
  const { ref, inView } = useInView();

  React.useEffect(() => {
    document.title = "Heyo | Explore";
    if (inView) fetchNextPage();
  }, [inView]);

  if (isFetching && !isFetchingNextPage)
    return <Loader message={"Fetching your content"} />;

  return (
    <Box bgcolor="primary.light" className="w-full">
      <div className="sm:w-full xl:w-[90%] sm:px-10 md:px-5 flex flex-col m-auto mb-10">
        <SearchBar />
        <Typography variant="h5" className="pb-2">
          Recent Posts
        </Typography>
        <Divider />
        <div className="flex flex-col mt-5">
          <GridPostList posts={posts} toDisplay={"explore"} />
          {hasNextPage && (
            <div ref={ref} className="bg-red-700">hsdhfsdh</div>
          )}
        </div>
      </div>
    </Box>
  );
}

export default Explore;
