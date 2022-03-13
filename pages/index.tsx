import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Home.module.css";

const validUrl = new RegExp(
  "((http|https)://)(www.)?" +
    "[a-zA-Z0-9@:%._\\+~#?&//=]" +
    "{2,256}\\.[a-z]" +
    "{2,6}\\b([-a-zA-Z0-9@:%" +
    "._\\+~#?&//=]*)"
);

const Home: NextPage = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ longUrl: longUrl.trim() }),
  };
  const handleSubmit = async () => {
    if (!validUrl.exec(longUrl)) {
      setErrorMessage("Enter a valid URL");
      toast.error("Please enter a valid URL");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}`, postData);

      if (response.status === 200) {
        const url = await response.json();

        setShortUrl(`${BACKEND_URL}/${url.message}`);
        setIsLoading(false);
      } else {
        toast.error(
          "there was a problem processing your request, please try again"
        );
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    // heroko tends to sleep so this just pings the server on component mount before the user is ready to paste a link
    fetch(`${BACKEND_URL}`)
      .then()
      .catch((e) => console.log(e));
  }, [BACKEND_URL]);

  const handleCopyToClipboard = () => {
    if (!shortUrl) {
      toast.error("shorten your url first");
      return;
    }
    navigator.clipboard.writeText(shortUrl).then(() => {
      toast.success("Copied");
      setShortUrl("");
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>trimmer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <div className={styles.logo}>trimmer</div>
      </nav>
      <main className={styles.maincontainer}>
        <div className={styles.longurl}>
          <h4>Paste your long URL here:</h4>
          <div className={styles.inputcontainer}>
            <svg
              className={styles.link}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z" />
            </svg>

            <input
              type="text"
              placeholder="Long url"
              value={longUrl}
              disabled={isLoading}
              onChange={(e) => {
                setLongUrl(e.target.value);
              }}
            />
            {isLoading && (
              <img
                src="/loader.png"
                alt=""
                style={{
                  position: "absolute",
                  top: "0",
                  right: "30px",
                  zIndex: "5",
                }}
              />
            )}

            <button disabled={isLoading} onClick={handleSubmit}>
              Shorten
            </button>
          </div>
        </div>
        <div className={styles.shorturl}>
          <h4>Your short URL:</h4>
          <div className={styles.inputcontainer}>
            <svg
              className={styles.link}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="white"
            >
              <path d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z" />
            </svg>
            <input
              type="text"
              placeholder="Short url"
              value={shortUrl}
              onChange={(c) => c}
              disabled
            />
            <button onClick={handleCopyToClipboard}>Copy</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
