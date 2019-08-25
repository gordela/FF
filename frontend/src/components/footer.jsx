import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="page-footer font-small unique-color-dark">
        <div style={{ backgroundColor: "#75bc54" }}>
          <div className="container">
            {/* Grid row*/}
            <div className="row py-4 d-flex align-items-center">
              {/* Grid column */}
              <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                <h6 className="mb-0">
                  Get connected with us on social networks!
                </h6>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-6 col-lg-7 text-center text-md-right">
                {/* Facebook */}
                <a className="fb-ic">
                  <FontAwesome name="fab fa-facebook-f white-text mr-4" />
                </a>
                {/* Twitter */}
                <a className="tw-ic">
                  <FontAwesome name="fab fa-twitter white-text" />
                </a>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row*/}
          </div>
        </div>
        {/* Footer Links */}
        <div className="container text-center text-md-left mt-5">
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <FontAwesome name="fas fa-home" /> Tbilisi, K.Kutateladze 8, GE
              </p>
              <p>
                <FontAwesome name="fas fa-envelope" /> info@emg.ge
              </p>
              <p>
                <FontAwesome name="fas fa-phone" /> + 995 555 55 55 55
              </p>
              <p>
                <FontAwesome name="fas fa-print" /> + 995 555 55 55 55
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.9221375752154!2d44.74112131581986!3d41.72219897923489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40447310d0442439%3A0x741ac75e14ceafaa!2zOCDhg5nhg5Dhg5rhg5jhg6Hhg6Lhg6Dhg5Dhg6Lhg5Qg4YOl4YOj4YOX4YOQ4YOX4YOU4YOa4YOQ4YOr4YOY4YOhIOGDpeGDo-GDqeGDkCwg4YOX4YOR4YOY4YOa4YOY4YOh4YOYIDAxNzc!5e0!3m2!1ska!2sge!4v1565613731588!5m2!1ska!2sge"
                width={400}
                height={300}
                frameBorder={0}
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Footer Links */}
        {/* Copyright */}
        <div className="footer-copyright text-center py-3">
          © 2019 Copyright
          <a href="https://mdbootstrap.com/education/bootstrap/"> </a>
        </div>
        {/* Copyright */}
      </footer>
    );
  }
}

export default Footer;
