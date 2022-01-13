import { Contribution } from "src/types/common/server-api";
import CompactContributionCard from "./CompactContributionCard";
import "./ContributionsCarousel.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRef } from "react";

function CarouselArrow({
  left = false,
  onPress,
}: {
  left?: boolean;
  onPress: () => void;
}) {
  return (
    <button onClick={onPress} className="carouselArrowButton">
      {left ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
    </button>
  );
}

export default function ContributionsCarousel({
  contributions,
}: {
  contributions: Contribution[];
}) {
  const overflowContainerRef = useRef<HTMLDivElement | null>(null);

  // scroll by half the width of the container
  const amountToScrollBy = overflowContainerRef?.current?.offsetWidth * 0.5;

  const onRightPress = () => {
    console.log({ overflowContainerRef });
    overflowContainerRef?.current?.scrollBy({
      left: amountToScrollBy,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        className="flex flex-row carouselOverflowContainer"
        ref={overflowContainerRef}
      >
        {contributions.map((contribution) => (
          <div className="pr-4" style={{ scrollSnapAlign: "start" }}>
            <CompactContributionCard
              key={contribution.id}
              contribution={contribution}
              hideHeader
            />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: "40%", right: -30, zIndex: 10 }}>
        <CarouselArrow onPress={onRightPress} />
      </div>
      <div
        style={{
          top: 0,
          right: 0,
          position: "absolute",
          height: "100%",
          width: "100px",
          backgroundImage: `linear-gradient(to right, rgba(255,0,0,0), rgb(32 32 44)  100%`,
        }}
      />
    </div>
  );
}
