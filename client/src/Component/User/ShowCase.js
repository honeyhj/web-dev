import React, { useState } from 'react';
import MainSlider from './MainSlider';
import './user.css'
const ShowCase = () => {
    const [box,setBox] = useState(false)
    const priceBox =() =>{

    }
    return (
        <div id="showCase">
            <div className="showCase-wrapper">
                <div className="showCase-item1">
                    <div className="box">
                        <div className="sub-box">
                            <button type="button" className="price-btn" onClick={()=>setBox(!box)}>Price Filter</button>
                            <input type="search" name="search" placeholder="Enter search item" className="search-inp"/>
                        </div>
                        {
                            box ?
                            <div className="dropBox">
                            <div>
                                <input type="checkbox" name="" id=""/>
                                <label>0-50</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id=""/>
                                <label>0-50</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id=""/>
                                <label>0-50</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id=""/>
                                <label>0-50</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id=""/>
                                <label>0-50</label>
                            </div>
                        </div>
                            :null
                        }
                    </div>
                    <div className="top-cat">
                        <h2>Top Categories</h2>
                        <div className="categories-item">
                            <ul>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="showCase-item2">
                    <MainSlider></MainSlider>
                </div>
            </div>
        </div>
    );
};

export default ShowCase;