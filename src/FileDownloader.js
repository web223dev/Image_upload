import React from "react";
import useFileDownloader from "./hooks/useFileDownloader";

const file = {
    name: "Photo 1",
    thumb: "/rs/identity/image/Q8007",
    file: "/rs/identity/image/Q8007",
    filename: "photo-1.jpg",
};

const FileDownloader = () => {
    const [downloadFile, downloaderComponentUI] = useFileDownloader();

    const download = (file) => downloadFile(file);

    return (
        <>
            <div className="row mt-5">
                <div className="col text-center">
                    <h2>File Downloader with progress bar in react</h2>
                    <div className="row mt-3">
                        <div className="col">
                            <div className="card ">
                                <div className="card-body">
                                    <img
                                        className="card-img-top mb-3"
                                        src={file.thumb}
                                    />
                                    <h5 className="card-title">{file.name}</h5>

                                    <a
                                        className="btn btn-primary cursor-pointer text-white"
                                        onClick={() => download(file)}
                                    >
                                        Download{" "}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {downloaderComponentUI}
            </div>
        </>
    );
};

export default FileDownloader;
