import React from 'react'
import OneCard from './OneCard';
import './Cards.css'
export default function Cards({features}) {
  return (
    <div className="front_page">
        <div className="heading">
            {/* <h1>Select What You Wanna Check??</h1> */}
        </div>
        <div className="all_cards">
            {
                features.map((feature)=>{
                    return <OneCard key={feature.id}  {...feature}></OneCard> //... is used to make a copy
                    //whenever you use map we have to use key
                })
            }
        </div>
    </div>);
  
}
