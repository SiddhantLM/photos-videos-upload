import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { uploadImages } from "../../services/operations/upload";

//mediaType issuee
function Basic({ mediaType }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
      type: file.type.split("/")[0],
    }));

    console.log(newFiles);

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);
  const acceptType =
    mediaType === "video"
      ? { "video/*": [".mp4", ".mkv", ".mov"] }
      : { "image/*": [".jpg", ".jpeg", ".png"] };
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: acceptType,
    multiple: true,
    maxSize: 52428800,
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);

  const removeFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    // Revoke the object URL for the file being removed
    URL.revokeObjectURL(updatedFiles[index].preview);
    // Remove the file from the array
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  React.useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedFiles]);

  const files = uploadedFiles.map((file, index) => (
    <li key={file.path}>
      {mediaType === "video" ? (
        <video width="600" height="600" className="my-3" controls>
          <source src={file.preview} type={file.type} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={file.preview}
          alt={file.path}
          width="300"
          height="200"
          style={{ objectFit: "cover", marginBottom: "10px" }}
        />
      )}

      {/* <p>
        {file.path} - {file.size} bytes
      </p> */}
      <button
        onClick={() => removeFile(index)}
        className="px-3 py-[5px] rounded-md bg-red-600 text-white cursor-pointer"
      >
        Remove
      </button>
    </li>
  ));

  return (
    <section className="container  flex flex-col gap-y-10 justify-between">
      <div
        className="dropzone p-20 rounded-md my-5 md:w-[600px] text-center"
        {...getRootProps({
          style: { border: "2px dashed #007bff" },
        })}
      >
        <input {...getInputProps()} className="" />
        <p>Drag 'n' drop </p>

        <button
          type="button"
          onClick={open}
          className="mt-[10px] p-[10px] bg-[#007bff] text-white cursor-pointer rounded-md font-medium "
        >
          Upload
        </button>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="px-5 py-3 self-center bg-green-500 font-semibold text-slate-100 w-fit rounded-md">
          <button
            onClick={() =>
              dispatch(uploadImages(user.user.email, uploadedFiles, token))
            }
          >
            {uploadedFiles.length > 1 ? "Upload All " : "Upload"}
          </button>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <aside>
          <h4>Files</h4>
          <ul className="flex flex-wrap">{files}</ul>
        </aside>
      )}
    </section>
  );
}

export default Basic;
