import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          // src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          src="https://t4.ftcdn.net/jpg/02/94/42/25/360_F_294422566_qppMaRZVSIoqjE81hFyEOC3EOLdv1I2i.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            key={1111}
            id="1111"
            title="2021 Apple MacBook Pro (14-inch, Apple M1 Pro chip with 8‑core CPU and 14‑core GPU, 16GB RAM, 512GB SSD) - Space Grey"
            price={2499.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/61vFO3R5UNL._AC_UL320_.jpg"
          />

          <Product
            key={2222}
            id="2222"
            title="Logitech MX Master 3 Advanced Wireless Mouse, Ultrafast Scrolling, Ergonomic, 4000 DPI, Customization, USB-C, Bluetooth, USB, Apple Mac, Microsoft PC Windows, Linux, iPad - Graphite"
            price={129.88}
            rating={4}
            image="https://m.media-amazon.com/images/I/614w3LuZTYL._AC_UL320_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            key={3333}
            id="3333"
            title="BenQ ScreenBar Plus e-Reading LED Monitor Light with Desktop Dial, Auto-Dimming and Hue Adjustment, No Screen Glare, Space Saving, Matte Black, USB Powered"
            price={200.0}
            rating={4}
            image="https://m.media-amazon.com/images/I/614takcLbQL._AC_UL320_.jpg"
          />
          <Product
            key={4444}
            id="4444"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
          />
          <Product
            key={5555}
            id="5555"
            title="Logitech G29 Driving Force Racing Wheel and Floor Pedals, Real Force Feedback, Stainless Steel Paddle Shifters, Leather Steering Wheel Cover for PS5, PS4, PC, Mac - Black"
            price={383.51}
            rating={4}
            image="https://m.media-amazon.com/images/I/61IYYoZ66VL._AC_UL320_.jpg"
          />
        </div>
        <Product
          key={6234}
          id="6234"
          title="Wilson Evolution Black Edition Official Basketball"
          price={89.95}
          image="https://m.media-amazon.com/images/I/91vdgs5FY4L._AC_UL320_.jpg"
          rating={3}
        />
        <div></div>
      </div>
    </div>
  );
}

export default Home;
