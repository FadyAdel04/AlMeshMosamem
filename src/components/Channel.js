import React, { useEffect, useRef, useState } from "react";
import { CountUp } from "countup.js"; // Ensure this is installed correctly
import { translations } from "../translations/translations"; // Import translations
import { FaYoutube } from "react-icons/fa";

const Channel = ({ language }) => {
  const [channelStats, setChannelStats] = useState({
    youtubeSubscribers: 0,
    youtubeViews: 0,
    youtubeVideoCount: 0,
    channelUrl:
      "https://l.wl.co/l?u=https%3A%2F%2Fyoutube.com%2F%40mahmouddesign_0%3Fsi%3D03AAh6tn5va_Inb3",
  });

  const totalSubscribersRef = useRef(null);
  const videoCountRef = useRef(null);
  const viewsRef = useRef(null);
  const hasAnimated = useRef(false); // Track if animation has already run

  useEffect(() => {
    // Fetch YouTube channel statistics from the API
    const fetchYouTubeStats = async () => {
      const channelId = "UCS3xekXwFrazK6RFDWE-O-g"; // Your YouTube Channel ID
      const apiKey = "AIzaSyAOPHJ2KwQ1WUf72pA79BcZwRkep-2a3XQ"; // Your YouTube API key
      const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const channelData = data.items[0];
          setChannelStats({
            youtubeSubscribers: parseInt(
              channelData.statistics.subscriberCount,
              10
            ),
            youtubeViews: parseInt(channelData.statistics.viewCount, 10),
            youtubeVideoCount: parseInt(channelData.statistics.videoCount, 10),
            channelUrl: `https://www.youtube.com/channel/${channelId}`,
          });
        }
      } catch (error) {
        console.error("Error fetching YouTube channel data:", error);
      }
    };

    fetchYouTubeStats();

    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          const countUpOptions = {
            startVal: 0,
            duration: 2.5, // Duration of the count-up animation
            useEasing: true,
          };

          // Start CountUp animation for each stat
          new CountUp(
            totalSubscribersRef.current,
            channelStats.youtubeSubscribers,
            countUpOptions
          ).start();
          new CountUp(
            videoCountRef.current,
            channelStats.youtubeVideoCount,
            countUpOptions
          ).start();
          new CountUp(
            viewsRef.current,
            channelStats.youtubeViews,
            countUpOptions
          ).start();

          hasAnimated.current = true; // Mark animation as run
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe the stats elements only after they are set
    if (totalSubscribersRef.current)
      observer.observe(totalSubscribersRef.current);
    if (videoCountRef.current) observer.observe(videoCountRef.current);
    if (viewsRef.current) observer.observe(viewsRef.current);

    return () => {
      observer.disconnect();
    };
  }, [channelStats]);

  return (
    <div className="channel-sec">
      <br />
      <h2 className={`section-title ${language}`}>
        {translations[language].channel}
      </h2>
      <section className="channel">
        <div className="channel-stats">
          <div className={`stat ${language}`}>
            <h3>{translations[language].channelStats.totalSubscribers}</h3>
            <span ref={totalSubscribersRef}>0</span>
          </div>
          <div className={`stat ${language}`}>
            <h3>{translations[language].channelStats.youtubeCourses}</h3>
            <span ref={videoCountRef}>0</span>
          </div>
          <div className={`stat ${language}`}>
            <h3>{translations[language].channelStats.youtubeViews}</h3>
            <span ref={viewsRef}>0</span>
          </div>
        </div>

        <div className={`youtube-stats ${language}`}>
          <h3>{translations[language].channelStats.youtubeChannelStats}</h3>
          <p>
            <strong>{translations[language].channelStats.subscribers}:</strong>{" "}
            {channelStats.youtubeSubscribers}
          </p>
          <p>
            <strong>{translations[language].channelStats.totalViews}:</strong>{" "}
            {channelStats.youtubeViews}
          </p>
          <p className="centered-btn">
            <a
              href={channelStats.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="youtube-btn">
                <FaYoutube className="youtube-icon" />
                {translations[language].channelStats.visitChannel}
              </button>
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Channel;
