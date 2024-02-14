import React, { useState, useEffect } from "react";
import anime from "animejs";
import { Player } from "@lottiefiles/react-lottie-player";

type SplashScreen = {
  finishLoading: () => void;
};

const SplashScreen = ({ finishLoading }: SplashScreen) => {
  const [isMounted, setIsMounted] = useState(false);
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: "#animation",
        delay: 0,
        scale: 1,
        duration: 500,
        easing: "easeInOutExpo",
      })
      .add({
        targets: "#animation",
        delay: 100,
        scale: 1.25,
        duration: 500,
        easing: "easeInOutExpo",
      })
      .add({
        targets: "#animation",
        delay: 100,
        scale: 1,
        duration: 500,
        easing: "easeInOutExpo",
      })
      .add({
        targets: "#animation",
        delay: 100,
        scale: 1.25,
        duration: 500,
        easing: "easeInOutExpo",
      })
      .add({
        targets: "#animation",
        delay: 100,
        scale: 1,
        duration: 500,
        easing: "easeInOutExpo",
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`flex h-screen items-center justify-center ${
        isMounted ? "visible" : "hidden"
      }`}
    >
      <div id="animation">
        <Player
          autoplay
          loop
          src="/assets/loading.json"
          className="w-32 h-32"
        ></Player>
      </div>
    </div>
  );
};

export default SplashScreen;
