import React from 'react';
import '../css/SetupPipeline.css';
import uploadIcon from '../images/service-icon-01.png';
import cvIcon from '../images/service-icon-02.png';
import previewIcon from '../images/service-icon-03.png';
import executeIcon from '../images/service-icon-03.png';
import resultIcon from "../images/service-icon-01.png";
import historyIcon from '../images/service-icon-02.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function SetupPipeline() {
  return (
    <div id="setup" className="our-services section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div
              className="section-heading wow bounceIn"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              {/* <h6>Our Services</h6> */}
              <h2>
                Setup <span>Pipeline</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <div
              className="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="icon">
                    <img src={uploadIcon} alt="" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="right-content">
                    <form method="POST" action="/upload" encType="multipart/form-data">
                      <br />
                      <label>
                        <b>Pipeline Name:</b>
                      </label>
                      <input
                        type="text"
                        name="pname"
                        id="pname"
                        placeholder="Enter Pipeline Name"
                        autoComplete="on"
                        size="17"
                      />
                      <br />
                      <input className="upload-button" id="button" type="submit" value="Submit" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.4s"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="icon">
                    <img src={cvIcon} alt="" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="right-content">
                    <h4>
                      <a href="#toolbar">Select CV Tools</a>
                    </h4>
                    <p>Select CV Tools from the CV Toolbar to preprocess uploaded image.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="icon">
                    <img src={previewIcon} alt="" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="right-content">
                    <h4>
                      <a href="#yourpipeline">Preview Pipeline</a>
                    </h4>
                    <p>Preview your pipeline before the execution.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.6s"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="icon">
                    <img src={executeIcon} alt="" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="right-content">
                    <h4>
                      <a href="#yourpipeline">Execute</a>
                    </h4>
                    <p>
                      Execute the pipeline to apply selected CV Tools for pre-processing on your
                      image.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.7s"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="icon">
                    <img src={resultIcon} alt="" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="right-content">
                    <h4>
                      {/* <a onClick={() => sendPipeline()} href="#yourpipeline"> */}

                      <a href="#yourpipeline">
                        View Result
                      </a>
                    </h4>
                    <p>
                      After executing the pipeline, view the intermediate results and final result.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.8s"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="icon">
                    <img src={historyIcon} alt="" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="right-content">
                    <h4>
                      <a href="#history">History</a>
                    </h4>
                    <p>
                      View Results of your previous pipeline execution in the history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetupPipeline;
