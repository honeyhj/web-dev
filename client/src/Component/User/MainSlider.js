import React, {Component} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pic1 from './img/1611672555450_pricing-bg-01.jpg'
import pic2 from './img/1611679520623_portfolio-big-03.jpg'
import pic3 from './img/1611853353251_cim.jpg'
class MainSlider extends Component {
    constructor(props){
        super();
        // this.next=this.next.bind(this);
        // this.prev=this.prev.bind(this);
    }
next(){
    this.slider.slickNext();
}
prev(){
    this.slider.slickPrev();
}
    render() {
        const settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div>
                <section id="mainSlider">
                    <div className="mainSlider-wrapper">
                        {/* <button onClick={this.prev}><i class="icofont-dotted-left"></i></button>
                        <button onClick={this.next}><i class="icofont-dotted-right"></i></button> */}
                        <Slider ref={c=>(this.slider=c)} {...settings}>
                            <div>
                                <img src={pic1} alt="pic" className="resize"/>
                            </div>
                            <div>
                                <img src={pic2} alt="pic" className="resize"/>
                            </div>
                            <div>
                                <img src={pic3} alt="pic" className="resize"/>
                            </div>
                        </Slider>
                    </div>
                </section>
            </div>
        );
    }
}

export default MainSlider;
