import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const CarouselStyle = styled.img`
    z-index: 2;
    height: 100vh;
    object-fit: auto 100%;
`;

const Carousels = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel controls={false} activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <CarouselStyle
                    className="d-block w-100"
                    src="https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/web-development-t.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CarouselStyle
                    className="d-block w-100"
                    src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile28.uf.tistory.com%2Fimage%2F990D9A505A9639C3304A90"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CarouselStyle
                    className="d-block w-100"
                    src="https://www.sciencemag.org/sites/default/files/styles/article_main_image_-_1280w__no_aspect_/public/sn-dark%20web.png?itok=c2Olj_WX"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default Carousels;
