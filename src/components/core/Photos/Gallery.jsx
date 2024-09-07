import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function TitlebarBelowImageList({
  width,
  mediaAPI,
  mediaType,
  handleOnDelete,
}) {
  return (
    <ImageList sx={{ width: { width }, height: 450 }}>
      {mediaAPI ? (
        mediaAPI.map((item) => (
          <ImageListItem key={item._id}>
            {mediaType === "images" ? (
              <img
                srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                alt={item.name}
                loading="lazy"
              />
            ) : (
              <video
                width="100%"
                height="auto"
                controls
                src={`${item.videoUrl}`}
                alt={item.name}
                loading="lazy"
              />
            )}
            {/* <div className="flex items-center"> */}

            {/* </div> */}
            <ImageListItemBar
              title={item.name}
              // subtitle={<span>by: {item.author}</span>}
              position="below"
            />
            <button
              className="rounded-md py-1 px-3  mx-auto mb-10 bg-red-500 text-white w-fit "
              onClick={() => handleOnDelete(item._id)}
            >
              Delete
            </button>
          </ImageListItem>
        ))
      ) : (
        <div>No media to show</div>
      )}
    </ImageList>
  );
}
