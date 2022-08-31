import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-content-container">
                <div className="footer-disclaimer">
                    <div>
                        This website is a capstone project. It is meant for demo purposes
                        only.
                    </div>
                    <div>
                        <i class="fa-regular fa-copyright"></i>
                        2022. Pinder. All rights reserved.
                    </div>
                </div>

                <div className="footer-linkedin">
                    <div>
                        Connect With the Developer!
                    </div>
                    <div>
                        <div className="footer-linkedin-icons-container">
                            <a
                                href="https://www.linkedin.com/in/yuehuang22/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
