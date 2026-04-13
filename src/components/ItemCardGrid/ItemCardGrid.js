import "./ItemCardGrid.css";
import ItemCard from "../ItemCard/ItemCard";
import { useState } from "react";

export default function ItemCardGrid({
  rowGap,
  columnGap,
  items,
  onCardImageClick,
  onLikeButtonClick,
  onFetchError,
  isLoggedIn,
}) {
  const [pageNumber, setPageNumber] = useState(1);

  //what if there are thousands of clothing items? I could fetch by 'date added'. I could fetch by user's items 1st, then by 'date added' if there's room for it

  return (
    <>
      {items?.map((cardData) => {
        return (
          <ItemCard
            key={cardData._id}
            cardData={cardData}
            onCardImageClick={onCardImageClick}
            onLikeButtonClick={onLikeButtonClick}
            onFetchError={onFetchError}
            isLoggedIn={isLoggedIn}
          />
        );
      })}
    </>
  );
}
