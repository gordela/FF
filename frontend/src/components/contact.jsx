import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import { getBranches } from "../services/branchService";
import MapGL from "react-map-gl";

class Contact extends Component {
  state = {
    branches: [],
    style: "mapbox://styles/mapbox/light-v9",
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: -74,
      latitude: 40.7,
      zoom: 11,
      maxZoom: 16
    }
  };

  async componentDidMount() {
    const { data: branches } = await getBranches();
    this.setState({ branches });
  }
  render() {
    return (
      <React.Fragment>
        <h1>
          <span class="first-letter">C</span>ontact
        </h1>

        <div style={{ display: "flex" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.9221375799393!2d44.74111595120802!3d41.72219897913296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40447310d0442439%3A0x741ac75e14ceafaa!2zOCDhg5nhg5Dhg5rhg5jhg6Hhg6Lhg6Dhg5Dhg6Lhg5Qg4YOl4YOj4YOX4YOQ4YOX4YOU4YOa4YOQ4YOr4YOY4YOhIOGDpeGDo-GDqeGDkCwg4YOX4YOR4YOY4YOa4YOY4YOh4YOYIDAxNzc!5e0!3m2!1ska!2sge!4v1566762151158!5m2!1ska!2sge"
            width={this.state.viewport.width}
            height={300}
            frameBorder={0}
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>

        <div style={{ padding: "10px" }} className="container">
          <div className="container-contact">
            <form action="action_page.php">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name.."
              />
              <label htmlFor="lname">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
              />
              <label htmlFor="subject">Subject</label>
              <textarea
                id="subject"
                name="subject"
                placeholder="Write something.."
                style={{ height: "200px" }}
                defaultValue={""}
              />
              <input type="submit" defaultValue="Submit" />
            </form>
          </div>
        </div>
        <h1>
          <span class="first-letter">B</span>ranches
        </h1>

        <div class="container">
          <div class="row">
            {this.state.branches.map(branch => (
              <div class="col-sm">
                {" "}
                <div style={{ display: "flex" }}>
                  <FontAwesome name="fas fa-location-arrow" size="3x" />
                  <div style={{ flexDirection: "column", marginLeft: "5px" }}>
                    <p>{branch.text_one}</p>
                    <p>{branch.text_two}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Contact;
