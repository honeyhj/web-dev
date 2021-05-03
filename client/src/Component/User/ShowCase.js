import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MainSlider from './MainSlider';
import URL from './Url';
import './user.css'
const ShowCase = (props) => {
    const [box, setBox] = useState(false)
    const [menus, setMenus] = useState([])
    const [l, setL] = useState(0)
    const [h, setH] = useState(0)
    // s=0
    // e=50
   
    const priceBox = () => {

    }
    const getmenus = async () => {
        await axios.get(`${URL}/getmenus`)
        .then((data) => {
            setMenus(data.data)
        })
        .catch(error=>{
            console.log(error);
        })
    };
    useEffect(() => {
        getmenus()
    }, [])

const setLimit=(l,h)=>{
setL(l);
setH(h);
axios.get()

}
    // console.log(menus);

    return (
        <div id="showCase">
            <div className="showCase-wrapper">
                <div className="showCase-item1">
                    <div className="box">
                        <div className="sub-box">
                            <button type="button" className="price-btn" onClick={() => setBox(!box)}>Price Filter</button>
                            <input type="search" name="search" onChange={(e)=>props.setSearchTerm(e.target.value)} placeholder="Enter search item" className="search-inp" />
                        </div>
                        {
                            box ?
                                <div className="dropBox">
                                    <div>
                                        <input type="checkbox" name="" id="" />
                                        <label>0-50</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" onClick={()=>setLimit(50,100)} name="" id="" />
                                        <label>0-50</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="" id="" />
                                        <label>0-50</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="" id="" />
                                        <label>0-50</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="" id="" />
                                        <label>0-50</label>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                    <div className="top-cat">
                        <h2>Top Categories</h2>
                        <div className="categories-item">
                            <ul>
                                {
                                    menus.map((item, index) => {
                                        if (item.topCategory) {
                                            return (
                                                <li key={index}>{item.CategoryName}</li>
                                            )
                                        }
                                    })
                                }
                                {/* <li>Lorem ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li> */}
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