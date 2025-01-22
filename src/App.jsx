import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [input, setInput] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [error, setError] = useState("");

  const handleDownloadQRCode = () => {
    if (!input) {
      setError("Please enter a URL or text before downloading.");
      return;
    }
    setError("");

    const canvas = document.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">Adam QR Code Generator</h1>
        <p className="text-lg text-gray-600">Create and customize your QR codes!</p>
      </header>

      <main className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <QRCodeCanvas value={input || ""} size={256} fgColor={fgColor} bgColor={bgColor} />
          <button onClick={handleDownloadQRCode} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Download QR Code
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter URL or Text..."
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        <div className="flex flex-col mb-4">
          <label className="mb-1">Foreground Color</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="border border-gray-300 rounded p-2"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-1">Background Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="border border-gray-300 rounded p-2"
          />
        </div>
      </main>
    </div>
  );
}

export default App;