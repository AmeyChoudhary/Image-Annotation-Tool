import React from 'react';
import '../css/MainBanner.css';

import cvImage from '../images/cv_img6.jpg';


function MainBanner() {
  return (
    <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                  <div className="row">
                    <div className="col-lg-4 col-sm-4">
                      <div className="info-stat">
                        <h6>Upload</h6>
                        <h4>Images</h4>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-4">
                      <div className="info-stat">
                        <h6>Setup</h6>
                        <h4>Pipeline</h4>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-4">
                      <div className="info-stat">
                        <h6>Perform</h6>
                        <h4>Preprocessing</h4>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h2>AI / CV Pipeline</h2>
                    </div>
                    <div className="col-lg-12">
                      <div className="main-green-button scroll-to-section">
                        <a href="#setup">Create Pipeline</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                  <img src={cvImage} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
