import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import UserContext from "../context/userContext";

function GridPostList({ posts, toDisplay }) {
  const { userDetails } = useContext(UserContext);
  let postsToRender = [];
  if (toDisplay == "explore") {
    posts.pages.forEach((item) => {
      postsToRender = postsToRender.concat(item.documents);
    });
  } else if (toDisplay == "save") {
    posts.forEach((item) => postsToRender.push(item.post));
  } else {
    postsToRender = posts;
  }
  return (
    <ul className="grid w-full gap-4 grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
      {postsToRender.map((item) => (
        <li
          key={item.$id}
          className="hover:scale-105 transition-transform relative"
        >
          <Link className="" to={`/posts/${item.$id}`}>
            <img className="h-full w-full" src={item.image}></img>
          </Link>
          <div className="w-full absolute bottom-0 justify-between mix-blend-difference">
              <PostStats
                forGrid={true}
                post={item}
                userId={userDetails.accountid}
              />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default GridPostList;
