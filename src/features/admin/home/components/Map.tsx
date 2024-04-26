import React from 'react'

const Map = () => (
  <div
    style={{
      maxWidth: '100%',
      overflow: 'hidden',
      color: 'red',
      width: '500px',
      height: '500px',
    }}
  >
    <div
      id="gmap-canvas"
      style={{ height: '100%', width: '100%', maxWidth: '100%' }}
    >
      <iframe
        title="Google Map"
        style={{ height: '100%', width: '100%', border: '0' }}
        src="https://www.google.com/maps/embed/v1/place?q=Số+30+Tân+Thắng,+phường+Sơn+Kỳ,+quận+Tân+Phú,+Tp.+Hồ+Chí+Minh,+Việt+Nam&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
      ></iframe>
    </div>
    <a
      className="from-embedmap-code"
      href="https://www.bootstrapskins.com/themes"
      id="enable-map-data"
    >
      premium bootstrap themes
    </a>
    <style>{`
      #gmap-canvas img {
        max-width: none!important;
        background: none!important;
        font-size: inherit;
        font-weight: inherit;
      }
    `}</style>
  </div>
)

export default Map
