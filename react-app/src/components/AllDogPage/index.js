import React from "react";
import "./AllDogPage.css";

function AllDogPage() {


    return (
        <>

            <div className="alldog-container">

                <div className="alldog-title">Our dogs</div>
                <div className="alldog-dogcard">
                    <div className="alldog-cardimage">

                        <img
                            className="alldog-dogimage"
                            alt="⚡"
                            src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                        ></img>
                    </div>
                    <div className="alldog-cardtext">
                        <div>
                            Owner: Yue
                        </div>
                        <div>
                            Name: Ollie
                        </div>
                        <div>
                            Gender: Male
                        </div>
                        <div>
                            Weight: 25 lbs
                        </div>
                    </div>
                </div>

                <button className="alldog-button">
                    add a dog
                </button>

            </div>

        </>
    );
}

export default AllDogPage;
