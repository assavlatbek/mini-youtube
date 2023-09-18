import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "../card/VideoCard";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import firebaseApp from "../firebase";

function HomePage() {
  const [video, setVideo] = useState([]);
  const [search, setSearch] = useState("");
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const options = {
    method: "GET",
    url: "https://youtube138.p.rapidapi.com/home/",
    params: {
      q: search,
      hl: "en",
      gl: "US",
    },
    headers: {
      "X-RapidAPI-Key": "50700d5118msh2a665ea3a7dc4fbp13faa9jsnf5c5673e15e7",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };

  const opt1 = {
    method: "GET",
    url: "https://youtube138.p.rapidapi.com/search/",
    params: {
      q: search,
      hl: "en",
      gl: "US",
    },
    headers: {
      "X-RapidAPI-Key": "50700d5118msh2a665ea3a7dc4fbp13faa9jsnf5c5673e15e7",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };

  const handleChange = async (event) => {
    setSearch(event.target.value);
    try {
      const response = await axios.request(opt1);
      setVideo(response.data.contents);
    } catch (error) {
      console.error(error);
    }
  };

  const getVideos = async () => {
    try {
      const response = await axios.request(options);
      setVideo(response.data.contents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideos();

    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);

        if (!localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(userData));
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <header>
        <nav className="nav">
          <div className="logo">
            <div className="menu">
              <img src="https://openclipart.org/image/2000px/221605" alt="" />
            </div>
            <img
              src="https://www.freeiconspng.com/thumbs/youtube-logo-png/youtube-logo-png-transparent-image-5.png"
              alt=""
            />
          </div>
          <div className="search">
            <div class="search-container">
              <input
                type="text"
                id="search-input"
                onChange={handleChange}
                placeholder="Search"
              />
              <img
                src="https://www.pngall.com/wp-content/uploads/8/Magnifying-Glass-Search-PNG-High-Quality-Image.png"
                alt="Search Icon"
                class="search-icon"
              />
            </div>
            <div className="mic">
              <img
                width="25px"
                src="https://cdn1.iconfinder.com/data/icons/material-audio-video/21/mic-512.png"
                alt=""
              />
            </div>
          </div>
          <div className="action">
            {user ? (
              <div className="user">
                <button className="red-bg" onClick={handleSignOut}>
                  SIGN OUT
                </button>
                <img src={user.photoURL} alt={user.displayName} />
              </div>
            ) : (
              <button className="sign-in" onClick={handleGoogleSignIn}>
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                  alt=""
                />{" "}
                SIGN IN
              </button>
            )}
          </div>
        </nav>
      </header>
      <div className="empty"></div>
      <div className="card-row">
        <div className="row ">
          <VideoCard video={video} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
