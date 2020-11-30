import React, { useState, useRef } from "react";
import axios, { CancelToken, isCancel } from "axios";
import { ProgressBar } from "react-bootstrap";

const FileUpload = () => {
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const cancelFileUpload = useRef(null);

    const uploadFile = ({ target: { files } }) => {
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

                setTimeout(() => {
                    setUploadPercentage(0);
                }, 1000);
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

    return (
        <>
            <div className="row justify-content-center bg-light">
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
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FileUpload;
