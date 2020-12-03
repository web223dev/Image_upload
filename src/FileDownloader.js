import React, { useState } from "react";
import axios, { isCancel } from "axios";
import useFileDownloader from "./hooks/useFileDownloader";

function downloadImage(img) {
  const downloadLink = document.createElement("a");
  const fileName = "photo-1.jpg";

  downloadLink.href = img;
  downloadLink.download = fileName;
  downloadLink.click();
}

const FileDownloader = () => {
    const [downloadFile, downloaderComponentUI] = useFileDownloader();
    const [ImgSource, setImageSource] = useState(null);

    axios
      .get(
        '/rs/identity/image/Q8007',
        { responseType: 'arraybuffer' },
      )
      .then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        setImageSource("data:;base64," + base64);
    });

    

    // const download = (file) => downloadFile(file); 
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
                                    />
                                    <h5 className="card-title">Photo 1</h5>

                                    <button
                                        className="btn btn-primary cursor-pointer text-white"
                                        onClick={()=>downloadImage(ImgSource)}
                                    >
                                        Download{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {downloaderComponentUI}
            </div>
        </>
    );
}

export default FileDownloader;
