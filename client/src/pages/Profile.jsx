import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

const Profile = () => {

  //firebase storage rule
  // allow read;
  // allow write: if request.resource.size < 2 * 1024 * 1024 && request.resource.contentType.matches('image/.*');
    

  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();
 
  const [formData, setFormData] = useState({});

  useEffect(()=> {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file)=> {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress))
        },
    
      (error) => {
        setFileUploadError(true);
        },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => 
            setFormData({...formData, avatar:downloadURL})
          );
        },
      )
  };


  const handleChange = (e)=> {
    setFormData({...formData, [e.target.id]: e.target.value});
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOutUser = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} hidden accept='image/*' type="file" ref={fileRef} />
        <img onClick={()=> fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt="" />
        <p className='text-sm self-center'>
          {fileUploadError ? 
            <span className='text-red-700'>Error Image Upload (Image must be less than 2 mb)</span> :
            filePercentage > 0 && filePercentage < 100 ? 
            <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span> :
            filePercentage === 100 ? 
            <span className='text-green-700'>Image Successfully Uploaded.</span> :
            ''
          }
        </p>
        <input type="text" placeholder={currentUser.username} id='username' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="email" placeholder={currentUser.email} id='email' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-85'>Update</button>
        <Link to='/create-listing' className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer '>Delete Account</span>
        <span onClick={handleSignOutUser} className='text-red-700 cursor-pointer '>Sign Out</span>
      </div>
      <p className='text-green-700'>{updateSuccess ? 'User Updated Successfully' : ""}</p>
    </div>
    
  )
}

export default Profile