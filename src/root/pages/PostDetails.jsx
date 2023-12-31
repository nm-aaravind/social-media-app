import React from "react";

function PostDetails() {
  React.useEffect(() => {
    document.title = "Heyo | Post Details";
  }, []);
  return <div>PostDetails</div>;
}

export default PostDetails;
