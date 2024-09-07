"use client";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import React from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/imagekit");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const onError = (err) => {
  console.log("Error", err);
};

const onSuccess = (res) => {
  console.log("Success", res);
};


export default function Home() {
  return (
    <div className="App">
      <IKImage
        urlEndpoint={urlEndpoint}
        path="default-image.jpg"
        width={400}
        height={400}
        alt="Alt text"
      />{" "}
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <div>
          <h2>File upload</h2>
          <IKUpload
            fileName="test-upload.png"
            onError={onError}
            onSuccess={onSuccess}
          />
        </div>
      </ImageKitProvider>
    </div>
  );
}
