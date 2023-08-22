"use client"
import { useState } from 'react';
import axios from '../../node_modules/axios/index';
import { ChangeEvent } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import RetriveImage from '@/components/RetriveImage';
import Image from 'next/image';

export default function Home() {

  // File Upload in Cloudnary

  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState('');
  const [uploadStatus, setUploadStatus] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setFilename(event.target.files[0].name);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmit(true);
    setUploadStatus(true);
    if (file) {
      console.log("Uploading file...");
      console.log(file);

      const formData = new FormData();

      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');

      try {

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dzus1xwmw/image/upload",
          formData
        );
        console.log(response);
        setImageURL(response.data.secure_url);
        setUploadStatus(true);
        setSubmit(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log("Image URL", imageURL);

  return (
    <div>

      {
        imageURL ? <Image src={imageURL} width={300} height={300} alt="get" /> : ""
      }

      <form onSubmit={handleSubmit} className='main'>
        <div>
          {
            uploadStatus && submit ? <><b>Uploading...</b> <InfinitySpin
              width='200'
              color="#4fa94d"
            /><br /></> : ""
          }
          {
            uploadStatus && !submit ? <><b>File Uploaded Successfully</b><br /></> : ""
          }
          <input type="file" onChange={handleFileChange} />
          <div className='form-main'>
            <label>{filename}</label>
            <button type="submit" className='btn btn-primary'>Upload</button>
          </div>
        </div>
      </form>

      {/* <RetriveImage /> */}

    </div>
  )
}
