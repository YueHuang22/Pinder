import React from "react";
import { useHistory, } from "react-router-dom";
import "./HomePage.css";


function HomePage() {
    const history = useHistory();


    //onClick fucntions
    function viewDogs() {
        history.push('/dogs');
    }

    function viewPlaydates() {
        history.push('/dogs');
    }

    function signUp() {
        history.push('/sign-up');
    }


    return (
        <>
            <div className="home-container">

                <img
                    className="home-dog-img"
                    alt="dog"
                    src="https://i.imgur.com/a7lpU8x.png"
                ></img>

                <div className="home-text-container">
                    <div className="home-text-div">
                        <div className="home-text-title">
                            How Pinder works
                        </div>
                        <div className="home-text">
                            Looking for a friend for you dog? Pinder connects dog lovers worldwide, and helps pet parents set up doggy playdates. Dog owners can search for doggie playmates nearby, and find local dog-friendly events and meet-ups. It’s free! Create an account today.
                        </div>
                    </div>
                </div>

                <div className="home-card-container">
                    <div className="home-card-div">
                        <div className="home-card">
                            <img className="home-dog-icon" alt="" src="https://i.imgur.com/S9KVZi3.png"></img>
                            <br></br>
                            <button className="home-button" onClick={viewDogs}>
                                View All Dogs
                            </button>
                            <p className="home-cardtext">
                                Puppy playdates don’t just make for adorable pictures, they’re an important part of socializing your pup.
                            </p>
                        </div>

                        <div className="home-card">
                            <img className="home-dog-icon" alt="" src="https://i.imgur.com/5ddzuyL.png"></img>
                            <br></br>
                            <button className="home-button" onClick={viewPlaydates}>
                                View My Playdates
                            </button>
                            <p className="home-cardtext">
                                Puppy socialization is key to raising a happy dog and shaping positive behaviors for the rest of their lives.
                            </p>
                        </div>

                        <div className="home-card">
                            <img className="home-dog-icon" alt="" src="https://i.imgur.com/9ond9zq.png"></img>
                            <br></br>
                            <button className="home-button" onClick={signUp}>
                                Join Pinder
                            </button>
                            <p className="home-cardtext">
                                Create a profile for your fellow dogs, share their lives, and find your community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;