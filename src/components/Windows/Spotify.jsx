
import React from "react";
import MacWindow from "./MacWindow";
import "./spotify.scss"
const Spotify = ({windowName, setWindowsState}) => {
  return (
    <div>
      <MacWindow width='20vw' windowName={windowName} setWindowsState={setWindowsState}>
        <div className="spotify-window">
         <iframe data-testid="embed-iframe" style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/playlist/35VmMdaaojkQOZtSpJCjAr?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
      </MacWindow>
    </div>
  );
};

export default Spotify;
