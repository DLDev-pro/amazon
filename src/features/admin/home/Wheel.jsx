import { motion } from "framer-motion";
import { useRef, useState } from "react";
// import WheelComponent from "react-wheel-of-prizes";
import "./wheel.css";
// import "react-wheel-of-prizes/dist/index.css";
import { Wheel } from "react-custom-roulette";
import R from "assets";

// import audio


const buttonMotion = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgba(255,255,255)",
    boxShadow: "0px 0px 8px rgba(255,255,255)",
    transition: {
      yoyo: Infinity,
      duration: 0.3,
    },
  },
};

const containerMotion = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      when: "beforeChildren",
    },
  },
};

export default function Game() {
  const ref = useRef();
  const data = [
    {
      option: "item 1",
      style: {
        backgroundColor: "#62c050",
        textColor: "white",
      },
    },
    {
      option: "item 2",
      style: {
        backgroundColor: "#699ee5",
        textColor: "white"
      },
    },
    {
      option: "item 3",
      style: {
        backgroundColor: "#fb8e42",
        textColor: "white"
      },
    },
    {
      option: "item 4",
      style: {
        backgroundColor: "#e83d45",
        textColor: "white"
      },
    },
    {
      option: "item 5",
      style: {
        backgroundColor: "#2142c9",
        textColor: "white"
      },
    },

  ];

  // state component
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [audio, setAudio] = useState();
  const [showPrize, setShowPrize] = useState("");
  const [modalPrize, setModalPrize] = useState(false);

  const [percentages, setPercentages] = useState([1, 5, Math.random() * 100, Math.random() * 100, Math.random() * 100]);

  // func random audio
  const randomNumber = () => {
    const random = Math.floor(Math.random() * 5);

    return random
  };


  const updateAudio = (source) => {
    setAudio(source);
    if (ref.current) {
      ref.current.pause();
      ref.current.load();
    }
  };

  const handleSpinClick = () => {
    //set percentage for each item in the wheel
    setPercentages([
      1,
      5,
      Math.random() * 95 + 6, // Random number between 6 and 100
      Math.random() * 95 + 6, // Random number between 6 and 100
      Math.random() * 95 + 6  // Random number between 6 and 100
    ]);

    // Find the index of the item with the maximum percentage
    const maxPercentageIndex = percentages.indexOf(Math.max(...percentages));
    console.log(maxPercentageIndex)

    //set prize number will be returned
    setPrizeNumber(maxPercentageIndex);
    setMustSpin(true);
    updateAudio(randomNumber());
    ref.current.play();
    ref.current.volume = 0.5;
  };

  // handle spin stop

  const handleSpinStop = () => {
    setMustSpin(false);
    ref.current.pause();
    setModalPrize(true);
    setShowPrize(data[prizeNumber].option);
  };
  function back() {
    setModalPrize(false);
  }


  const ModalPrize = () => {
    return (
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 999,
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: '12rem',
            left: '50%',
            transform: 'translateX(-50% )',
            width: '95%',
            margin: '0 auto',
            height: '15rem',
            zIndex: 999,
            background: `url(${R.images.bgModalHome}) 2rem no-repeat, -webkit-gradient(linear, left top, left bottom, from(#ffcc2c), color-stop(60%, #fff))`,
            backgroundClip: 'padding-box',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            outline: 0,
            pointerEvents: 'auto',
          }}
        >

          <div
            style={{
              position: 'absolute',

            }}
          >
            <div
              style={{
                alignItems: 'center',
                borderBottom: '1px solid rgba(0,0,0,.125)',
                borderTopLeftRadius: '0.3rem',
                borderTopRightRadius: '0.3rem',
                display: 'flex',
                flexShrink: 0,
                justifyContent: 'center',
                padding: '1rem',
                marginLeft: '40px',
              }}
            >
              <img
                src={R.images.modalleft}
                style={{
                  width: '35px',
                }}
                alt=""
              />
              <img
                src={R.images.thongbaodacbiet}
                style={{
                  width: '200px',
                }}
                alt=""
              />
              <img
                src={R.images.modalright}
                style={{
                  width: '35px',
                }}
                alt=""
              />
            </div>
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                margin: '0 25px',
                fontSize: '14px',
                padding: '1rem',
                position: 'relative',
                width: '95%',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  fontSize: '16px',
                }}
              >
                Chúc mừng bạn đã trúng thưởng
              </h1>
              <p>{showPrize}</p>
              <button onClick={back} style={{
                backgroundColor: '#4CAF50',
                border: 'none',
                color: 'white',
                padding: '15px 32px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
              }}>Xác nhận</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    // container game page
    <motion.div
      className="game"
      variants={containerMotion}
      initial="hide"
      animate="visible"
    >
      {/* game audio */}

      <audio className="game_audio" ref={ref}>
      </audio>

      {/* game content */}

      <div className="game_content">
        {/* lucky wheel */}

        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleSpinStop}
          outerBorderColor="#4E5452"
          outerBorderWidth={3}
          innerBorderColor="#4E5452"
          innerBorderWidth={3}
          radiusLineColor="#4E5452"
        />

        {/* lucky wheel spin */}

        <motion.button
          variants={buttonMotion}
          whileHover="hover"
          className="game_content_spin"
          onClick={handleSpinClick}
        >
          Quay thưởng
        </motion.button>
      </div>

      {/* when spin stop => show prize component */}
      {modalPrize && <ModalPrize />}

    </motion.div>
  );
}
