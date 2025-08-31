import React, { useRef, useState } from 'react';

const VideoCall: React.FC = () => {
  const [inCall, setInCall] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  // Start call with camera/mic
  const handleStartCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setInCall(true);
      setVideoEnabled(true);
      setAudioEnabled(true);
    } catch (err) {
      alert('Could not access camera/mic.');
    }
  };

  // End call and stop all tracks
  const handleEndCall = () => {
    setInCall(false);
    setScreenSharing(false);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Toggle video
  const handleToggleVideo = () => {
    setVideoEnabled(v => {
      const newState = !v;
      if (mediaStreamRef.current) {
        const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
        if (videoTrack) videoTrack.enabled = newState;
        // If turning video ON, set srcObject to camera stream if not screen sharing
        if (newState && inCall && !screenSharing && videoRef.current) {
          videoRef.current.srcObject = mediaStreamRef.current;
        }
      }
      return newState;
    });
  };

  // Toggle audio
  const handleToggleAudio = () => {
    setAudioEnabled(a => {
      if (mediaStreamRef.current) {
        const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = !a;
      }
      return !a;
    });
  };

  // Screen share
  const handleScreenShare = async () => {
    if (!inCall) return;
    if (!screenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = screenStream;
        if (videoRef.current) {
          videoRef.current.srcObject = screenStream;
        }
        setScreenSharing(true);
        // When user stops sharing
        screenStream.getVideoTracks()[0].onended = () => {
          if (mediaStreamRef.current && videoRef.current) {
            videoRef.current.srcObject = mediaStreamRef.current;
          }
          setScreenSharing(false);
        };
      } catch (err) {
        alert('Could not start screen share.');
      }
    } else {
      // Stop screen share
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
        screenStreamRef.current = null;
      }
      if (mediaStreamRef.current && videoRef.current) {
        videoRef.current.srcObject = mediaStreamRef.current;
      }
      setScreenSharing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6 rounded-2xl shadow-2xl max-w-3xl mx-auto border border-gray-800">
      <h2 className="text-cyan-400 text-2xl font-heading mb-4 text-center">Video Call</h2>
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative w-full h-64 bg-black rounded-xl flex items-center justify-center mb-2 border-2 border-cyan-400 overflow-hidden">
          {inCall ? (
            videoEnabled ? (
              <video ref={videoRef} autoPlay muted className="w-full h-full object-cover rounded-xl" style={{ background: '#222' }} />
            ) : (
              <span className="text-gray-500 text-xl">Video Off</span>
            )
          ) : (
            <span className="text-gray-500 text-xl">No Call</span>
          )}
          {screenSharing && (
            <div className="absolute top-0 left-0 w-full bg-cyan-400 bg-opacity-80 text-black py-2 text-center text-lg font-bold z-10">Screen Sharing Active</div>
          )}
        </div>
        <div className="flex gap-4 mt-2 w-full justify-center">
          {!inCall ? (
            <button className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 px-4 py-2 rounded font-bold shadow" onClick={handleStartCall}>Start Call</button>
          ) : (
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold shadow" onClick={handleEndCall}>End Call</button>
          )}
          <button className={`px-4 py-2 rounded font-bold shadow ${videoEnabled ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700 text-gray-400'}`} onClick={handleToggleVideo} disabled={!inCall}>
            {videoEnabled ? 'Video On' : 'Video Off'}
          </button>
          <button className={`px-4 py-2 rounded font-bold shadow ${audioEnabled ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700 text-gray-400'}`} onClick={handleToggleAudio} disabled={!inCall}>
            {audioEnabled ? 'Audio On' : 'Audio Off'}
          </button>
          <button className={`px-4 py-2 rounded font-bold shadow ${screenSharing ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700 text-gray-400'}`} onClick={handleScreenShare} disabled={!inCall}>
            {screenSharing ? 'Stop Share' : 'Screen Share'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
