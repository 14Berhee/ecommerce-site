import { TiStarFullOutline } from "react-icons/ti";

export const ProductRating = (props) => {
  const { rating } = props;

  return (
    <div className="flex gap-1">
      {Array(5)
        .fill(null)
        .map((_, index) => {
          return (
            <TiStarFullOutline
              color={Number(rating) > index ? "orange" : "grey"}
              key={index}
            />
          );
        })}
    </div>
  );
};
