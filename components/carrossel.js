import React from "react";
import Slider from "react-slick";
import { Box, Link } from "@chakra-ui/react";

const CarouselLinks = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box>
      <Slider {...settings}>
        <Box>
          <Link href="#">Link 1</Link>
        </Box>
        <Box>
          <Link href="#">Link 2</Link>
        </Box>
        <Box>
          <Link href="#">Link 3</Link>
        </Box>
        <Box>
          <Link href="#">Link 4</Link>
        </Box>
        <Box>
          <Link href="#">Link 5</Link>
        </Box>
      </Slider>
    </Box>
  );
};

export default CarouselLinks;
