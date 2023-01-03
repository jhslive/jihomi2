import React, { useState, useEffect } from "react";
import "./App.css";
import bgLong from "./bg_long.png";
import bgShort from "./bg_short.png";
import tanguPic from "./tangu.png";
import html2canvas from "html2canvas";

function App() {
  const [coin, setCoin] = useState("XRPUSDT");
  const [entryPrice, setEntryPrice] = useState("0.31845");
  const [closingPrice, setClosingPrice] = useState("0.33423");
  const [isLong, setIsLong] = useState(true);
  const [numsLoc, setNumsLoc] = useState([0, 0, 0]);
  const [numLocLR, setNumLocLR] = useState(0);
  const [leverage, setLeverage] = useState("75");
  const [date, setdate] = useState("01/02/2023, 14:53:30");
  const [result, setResult] = useState(
    ((closingPrice / entryPrice - 1) * 75 * 100).toFixed(2)
  );
  const [tangu, setTangu] = useState(false);

  useEffect(() => {
    const calculated = (
      (closingPrice / entryPrice - 1) *
      leverage *
      100
    ).toFixed(2);
    if (!isLong && calculated < 0) {
      setResult(-calculated);
    } else {
      setResult(calculated);
    }
  }, [entryPrice, closingPrice, coin, isLong, leverage]);

  function downLoad() {
    console.log("download started!");
    const name =
      (isLong ? "Long-" : "Short-") +
      coin +
      "-" +
      entryPrice +
      "-" +
      closingPrice;

    const image = document.getElementById("image");
    html2canvas(image).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), name + ".png");
    });
  }

  function down() {
    const one = numsLoc[0] + 1;
    const two = numsLoc[1] + 1;
    const three = numsLoc[2] + 1;
    setNumsLoc([one, two, three]);
  }
  function up() {
    const one = numsLoc[0] - 1;
    const two = numsLoc[1] - 1;
    const three = numsLoc[2] - 1;
    setNumsLoc([one, two, three]);
  }
  function left() {
    setNumLocLR(numLocLR - 1);
  }
  function right() {
    setNumLocLR(numLocLR + 1);
  }


  const onSaveAs = (uri, filename) => {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <span>
        롱(체크)/숏(미체크) &nbsp;
        <input
          type="checkbox"
          checked={isLong}
          onChange={(e) => setIsLong(!isLong)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        코인종류 &nbsp;
        <input value={coin} onChange={(e) => setCoin(e.target.value)} />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        Leverage &nbsp;
        <input value={leverage} onChange={(e) => setLeverage(e.target.value)} />
      </span>
      <br />
      <br />
      <span>
        매수금액 &nbsp;
        <input
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        매도금액 &nbsp;
        <input
          value={closingPrice}
          onChange={(e) => setClosingPrice(e.target.value)}
        />
      </span>
      <br />
      <br />
      <span>
        날짜시간 &nbsp;
        <input
         value={date}
         onChange={(e) => setdate(e.target.value)}
         />
      </span>  
      <br />
      <br />
      <button onClick={up}>이름 위로</button>
      <br />
      <br />
      <button onClick={left}>이름 좌로</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={right}>이름 우로</button>
      <br />
      <br />
      <button onClick={down}>이름 아래로</button>
      <br />
      <br />
      <button onClick={downLoad}>다운로드</button>
      <br />
      <br />
      <div
        id="image"
        style={{
          backgroundImage: `url(${tangu ? tanguPic : (isLong ? bgLong : bgShort)})`,
          backgroundSize: "cover",
          height: "840px",
          width: "1346px",
          margin: "0 auto",
          position: "relative",
        }}
      >

          <div
            style={{
              position: "absolute",
              left: numLocLR + 85 + "px",
              top: numsLoc[0] + 160 + "px",
              fontSize:"42px",
              color: "rgb(254,254,254)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {coin} Perpetual
          </div>
         
          <div
            style={{
              position: "absolute",
              left: "200px",
              top: "227px",
              fontSize: "28px",
              color: "RGB(126,126,126)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {leverage.toString(2)}X
          </div>
          <div
            style={{
              position: "absolute",
              left:"85px",
              top: "570px",
              fontSize: "30px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            ₮ {(Number(entryPrice)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              left: "270px",
              top: "570px",
              fontSize: "30px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            ₮ {(Number(closingPrice)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              left: "235px",
              top: "731px",
              fontSize: "28px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {date}
          </div>
           <div
            style={{
              position: "relative",
            }}
          >
                <div
              style={{
                position: "absolute",
                left: "80px",
                top: "345px",
                fontSize: "125px",
                color: "rgb(4, 191, 136)",
                fontFamily: "HarmonyOS Sans",
                fontWeight: "700",

              }}
            >
              {result > 0 ? (
                <span
                  style={{
                    fontSize: "125px",
                    fontWeight: "700",
                  }}
                >
                  +
                </span>
              ) : (
              ""
              )}
              {result}
              <span
                style={{
                    fontSize: "125px",
                    fontWeight: "700",
                }}
              >
                %
              </span>
            </div>
          </div> 
      </div>
      <br />
      <br />
      <div>
        <i>Made By</i> <b>Jung Ji </b><span onClick={() => setTangu(!tangu)}><b>Ho</b></span>
      </div>
    </div>
  );
}

export default App;
