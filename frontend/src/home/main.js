import React from 'react'
import Hero from './hero'
import News from './news'
import Home from '../career/home'
import HomeProduct from './product'

export default function Mian() {
    return (
        <div>
            <div>
                <Hero />
            </div>
            <div style={{ marginTop: "40px", marginBottom: "40px" }}>

                <News />
                <div style={{ marginTop: "40px" }}>
                    <Home />
                </div>
                <HomeProduct />
            </div>
        </div>

    )
}
