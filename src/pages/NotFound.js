import React from "react";

function Notfound () {
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="level">
            <div className="level-item has-text-centered">
              <img
                src={
                  "https://res.cloudinary.com/image-chatbot/image/upload/v1585076879/images/error-404_v9fzte.png"
                }
                alt="404"
              />
            </div>
          </div>
          <div className="level">
            <div className="level-item has-text-centered">
              <h2 className="title" style={{ marginBottom: 0, fontSize: 100 }}>
                404
              </h2>
            </div>
          </div>
          <div className="level">
            <div className="level-item has-text-centered">
              <h4 className="title" style={{ marginTop: 0 }}>
                Page Not Found!
              </h4>
            </div>
          </div>
          <div className="level">
            <div className="level-item has-text-centered">
              <a
                href="/"
                className="subtitle"
                style={{
                  marginTop: 0,
                  font: "Bold24px/28px Roboto",
                  color: "#007AFF",
                }}
              >
                &#60;Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Notfound;
