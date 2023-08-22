import axios from 'axios';
import React from 'react'

const RetriveImage = () => {

    console.log("This is cloud name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    const handleRetriveImage = async () => {

        // await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image`, {
        //     headers: {
        //         Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY + ':' + process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET).toString('base64')}`
        //     }
        // }).then(r => r.json()).catch(err => console.log("error while restriving the Image", err));

        await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`, {
            headers: {
                Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`,
            },
        }).then(r => r.json());
    }

    return (
        <div className='retrive'>
            <button className='retrive-image btn btn-primary' onClick={handleRetriveImage}>
                Retrive Images
            </button>
        </div>
    )
}

export default RetriveImage