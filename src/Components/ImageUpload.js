import { Button } from '@mui/material';
import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, put, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './ImageUpload.css';

function ImageUpload( {username } ) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');

    function handleChange(e) {
        // Get the first file you selected
        if (e.target.files[0]) {
            // Set the image state to that file
            setImage(e.target.files[0]);
        }
    }

    function handleUpload() {
      if (caption) {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
      
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress function
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            // Error function
            console.log(error);
            alert(error.message);
          },
          () => {
            // Complete function
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Post the image URL inside db
              addDoc(collection(db, "posts"), {
                timestamp: serverTimestamp(),
                caption: caption,
                imageURL: downloadURL,
                username: username,
              })
                .then(() => {
                  setProgress(0);
                  setCaption("");
                  setImage(null);
                })
                .catch((error) => {
                  console.log(error);
                  alert(error.message);
                });
            });
          }
        );
      } else {
        alert("Choose image and caption.")
      }
    }

    return (
        <div className="image-upload">
          <div className="image-upload-row1">
            <input class="image-input" type="file" onChange={handleChange} />
            <input class="image-caption" type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption}/>
          </div>
            <progress className="image-upload-progress" value={progress} max="100" />
            <button className="upload-button" onClick={handleUpload}>
                Upload
            </button>
        </div>
    )
}

export default ImageUpload;
