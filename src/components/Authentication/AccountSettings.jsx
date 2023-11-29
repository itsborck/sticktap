import { useState } from "react";

const AccountSettings = ({ handleFileChange, handleUpload, handleRemove, photoURL }) => {
  const [previewURL, setPreviewURL] = useState(photoURL);

  const handleFileChangeWithPreview = (event) => {
    handleFileChange(event);
    setPreviewURL(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      {previewURL && <img src={previewURL} alt="Preview" className="w-32 h-32 object-cover rounded-full mb-5" />}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChangeWithPreview}
        className="w-1/2 px-3 py-2 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={handleUpload}
        className="w-1/2 px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Upload
      </button>
      <button
        onClick={handleRemove}
        className="w-1/2 px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
      >
        Remove Profile Picture
      </button>
    </div>
  );
};

export default AccountSettings;
