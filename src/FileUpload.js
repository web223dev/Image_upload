import React, { useState, useRef } from "react";
import axios, { CancelToken, isCancel } from "axios";
import { ProgressBar } from "react-bootstrap";
import useFileDownloader from "./hooks/useFileDownloader";

const file_detail = {
    name: "Photo 1",
    thumb: "/rs/identity/image/Q8007",
    file: "/rs/identity/image/Q8007",
    filename: "photo-1.jpg",
};

const FileUpload = () => {
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const cancelFileUpload = useRef(null);
    const [image, setImage] = useState({ file: "", imagePreviewUrl: "" });
    const [downloadFile, downloaderComponentUI] = useFileDownloader();

    const uploadFile = ({ target: { files } }) => {
        let reader = new FileReader();

        reader.onloadend = () => {
            setImage({
                file: files[0],
                imagePreviewUrl: reader.result,
            });
        };

        reader.readAsDataURL(files[0]);

        let data = new FormData();
        data.append("file", files[0]);

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;

                let percent = Math.floor((loaded * 100) / total);

                if (percent < 100) {
                    setUploadPercentage(percent);
                }
            },
            cancelToken: new CancelToken(
                (cancel) => (cancelFileUpload.current = cancel)
            ),
        };

        axios
            .post("/rs/identity/image/Q8007", data, options)
            .then((res) => {
                console.log(res);
                setUploadPercentage(100);

                // setTimeout(() => {
                //     setUploadPercentage(0);
                // }, 3000);
            })
            .catch((err) => {
                console.log(err);

                if (isCancel(err)) {
                    alert(err.message);
                }
                setUploadPercentage(0);
            });
    };

    const cancelUpload = () => {
        if (cancelFileUpload.current)
            cancelFileUpload.current("User has canceled the file upload.");
    };

    const download = (file) => downloadFile(file);
    return (
        <>
            <div className="row justify-content-center bg-light p-5">
                <div className="col-md-6 text-center">
                    <h2>Upload your profile picture</h2>

                    <p>
                        You can upload a sample file to see the progress bar
                        with cancel file upload button
                    </p>
                    <p>
                        <input
                            type="file"
                            className="form-control-file"
                            onChange={uploadFile}
                        />
                    </p>
                    {uploadPercentage > 0 && (
                        <div className="row mt-3">
                            <div className="col pt-1">
                                <ProgressBar
                                    now={uploadPercentage}
                                    striped={true}
                                    label={`${uploadPercentage}%`}
                                />
                            </div>
                            <div className="col-auto">
                                <span
                                    className="text-primary cursor-pointer"
                                    onClick={() => cancelUpload()}
                                >
                                    Cancel
                                </span>
                            </div>
                            <div className="col">
                                <label htmlFor="upload-button">
                                    {image.imagePreviewUrl ? (
                                        <img
                                            src={image.imagePreviewUrl}
                                            alt="dummy"
                                            width="300"
                                            height="300"
                                        />
                                    ) : (
                                        <>
                                            <span className="fa-stack fa-2x mt-3 mb-2">
                                                <i className="fas fa-circle fa-stack-2x" />
                                                <i className="fas fa-store fa-stack-1x fa-inverse" />
                                            </span>
                                            <h5 className="text-center">
                                                Upload your photo
                                            </h5>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                    )}
                    <button
                        className="btn btn-primary cursor-pointer text-white"
                        onClick={() => download(file_detail)}
                    >
                        Download{" "}
                    </button>
                    {downloaderComponentUI}
                </div>
            </div>
        </>
    );
};

export default FileUpload;
