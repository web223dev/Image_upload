import React, { useState } from "react";
import axios from "axios";

function downloadImage(img) {
  const downloadLink = document.createElement("a");
  const fileName = "photo-1.jpg";

  downloadLink.href = img;
  downloadLink.download = fileName;
  downloadLink.click();
}

const FileDownloader = () => {
    const [ImgSource, setImageSource] = useState(null);

    axios
        .get("/rs/identity/image/Q8007", { responseType: "arraybuffer" })
        .then((response) => {
            const base64 = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );
            setImageSource("data:;base64," + base64);
        });

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
                                        src={ImgSource}
                                        alt="Server Img"
                                    />
                                    <h5 className="card-title">Photo 1</h5>

                                    <button
                                        className="btn btn-primary cursor-pointer text-white"
                                        onClick={() => downloadImage(ImgSource)}
                                    >
                                        Download{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FileDownloader;
