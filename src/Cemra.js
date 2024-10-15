import React, { useRef, useState } from 'react';
import "./Cemra.css";

const Cemra = () => {
    const cardCemra = [
        { title: "http://localhost:3003/_next/static/media/shopByShapeGlass3.97ee3d67.png", description: "This is the first card" },
        { title: "http://localhost:3003/_next/static/media/shopByShapeGlass1.9c6333f6.png", description: "This is the second card" },
        { title: "http://localhost:3003/_next/static/media/shopByShapeGlass4.4b33f428.png", description: "This is the third card" },
        { title: "http://localhost:3003/_next/static/media/shopByShapeGlass5.299ad172.png", description: "This is the fourth card" },
        { title: "http://localhost:3003/_next/static/media/shopByShapeGlass1.9c6333f6.png", description: "This is the fifth card" },
        { title: "http://localhost:3003/_next/static/media/shopByShapeGlass4.4b33f428.png", description: "This is the sixth card" },
        { title: "http://localhost:3003/_next/static/media/shopByShapeGlass6.0.9a2a1b46.png", description: "This is the seventh card" },
        { title: "http://localhost:3003/_next/static/media/shopByShapeGlass5.299ad172.png", description: "This is the eighth card" },
    ];

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [cardBackgrounds, setCardBackgrounds] = useState(Array(cardCemra.length).fill(null));

    // Function to open the camera
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing the camera: ", err);
        }
    };

    // Function to take the photo and set it as the background for all cards
    const takePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            // Get the image data URL
            const imageDataUrl = canvasRef.current.toDataURL('image/png');

            // Set the captured photo as background for all cards
            const updatedBackgrounds = Array(cardCemra.length).fill(imageDataUrl); // Apply the same photo to all cards
            setCardBackgrounds(updatedBackgrounds);
        }
    };

    return (
        <div>
            <h1>React Camera Capture</h1>

            {/* Button to open the camera */}
            <button onClick={openCamera}>Open Camera</button>

            {/* Video stream element */}
            <div>
                <video ref={videoRef} width="240" height="240" autoPlay />
            </div>

            {/* Button to take the photo */}
            <button onClick={takePhoto}>Take Photo for All Cards</button>

            {/* Hidden canvas to capture the image */}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {/* Map function to display cards and use captured photo as background */}
            <div style={{
    backgroundPosition: `${50}% ${30}%`
}} className='cam'>
                {cardCemra.map((data, index) => (
                    <div
                        key={index}
                        className='cam-1'
                        style={{
                            backgroundImage: cardBackgrounds[index] ? `url(${cardBackgrounds[index]})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center top', // Approximate positioning for eye focus
                        }}
                    >
                        <img className='cam-img-glas' src={data.title} alt={`card-${index}`} />
                        {/* <h5>price: RS 565</h5> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cemra;
