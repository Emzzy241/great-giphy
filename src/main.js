// UserInterface Logic file

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// importing all three classes to my UI logic
import { SearchGiphyService, RandomGif, TrendingGif } from "./giphy-service.js";

// importing my app logo image

import jsImage from "./assets/images/js-badge.svg";



// working with the imported classes

$(document).ready(function () {

    // for the imported Javascript logo for application
    let iconImg = $(".appImg");
    iconImg.attr("href", jsImage);

    $(".user-form").submit(function (event) {
        // preventing the submit button from refreshing 
        event.preventDefault();

        // taking in the user-emotion value

        const userGif = $("#user-emotion").val();
        // clearing out the form fields after user submits

        $("#user-emotion").val("");

        // first way to handle our responses with an IIFE(Immediately Invoked Function Expression)

        (async function(){
            // telling JavaScrript to await the response and store value in a variable
            const firstCall = await SearchGiphyService.getSearchedGif(userGif);
            getMySearchedGif(firstCall);
        })();

        // a function that will work with the response I get and get me the searched gif

        function getMySearchedGif(myFirstGiphyResponse) {
            // here I run a branch to determine if there is a data property in myFirstGiphyResponse, If there is then its a successful call


            if (myFirstGiphyResponse.data) {
                // getting and storing the gif embed url property
                const firstEmbeddedGifUrl = myFirstGiphyResponse.data[0].embed_url;

                // showing(in this case prepending) the gifs in the application for user
                $(".giphy-shower").prepend(
                    `
                <br> <br>
                    <h5>You entered; ${userGif}, here is a gif for you</h5> 
                <iframe src="${firstEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                );

            }
            else {
                // if there isn't any data property in myFirstGiphyResponse parameter, I handle the error as follows

                $(".giphy-shower").prepend(
                    // returning the response itself if there is no data property
                    `
                    <br> <br>
                    <h5>There was an error processing your Request: ${myFirstGiphyResponse}</h5>    
                    <h5>Please Try again</h5>    
                `
                );
            }

        }

        // making use of the class I imported

        



    });


    $("#other-features").click(function () {

        let userPick = $("#new-features").find(":selected").val();
        console.log(userPick);

        if (userPick === "random") {

            // havng an Async function with an IIFE.... AND passing the value user selected in it
            (async function(){
                let secondCall = await RandomGif.getRandomGif(userPick);
                getMyRandomGif(secondCall);
            })()


            // a function for random gifs that would be called when I handle me successful response

            function getMyRandomGif(mySecondGiphyResponse) {
                if (mySecondGiphyResponse.data) {
                    const secondEmbeddedGifUrl = mySecondGiphyResponse.data.embed_url;

                    // showing(in this case prepending) the gifs in the application for user
                    $(".gif-shower-two").prepend(
                        `
                            <br> <br>
                            <h5>A Random gif for user</h5> 
                            <iframe src="${secondEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                    );
                }
                else {

                    // if there isn't a main property in mySecondGiphyResponse, then handle the error as follows
                // returning an error message to the user, and Since I have handled that with my try...catch block(to return the message property in any errors) in my business logic file, I just return only mySecondGiphyResponse
                    $(".gif-shower-two").prepend(
                        `
                        <br> <br>
                        <h5>There was an error processing your Request: ${mySecondGiphyResponse}</h5>    
                        <h5>Please Try again</h5>    
                    `
                    );
                }

            }

           

        }
        else if (userPick === "trend") {

            // the second way of worrking with API calls in async. Not using IIFE but a named function that gets called before the branch

            // calling the function 
            makeTrendCall();

            function getTrendGif(myThirdGiphyResponse) {
                if (myThirdGiphyResponse.data) {
                    const thirdEmbeddedGifUrl = myThirdGiphyResponse.data[0].embed_url;

                    // showing(in this case prepending) the gifs in the application for user
                    $(".gif-shower-two").prepend(
                        `
                        <br> <br>
                        <h5>A Trending gif for user</h5> 
                        <iframe src="${thirdEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                    );

                }
                else {
                    $(".gif-shower-two").prepend(
                        `
                        <br> <br>
                        <h5>There was an error processing your Request: ${myThirdGiphyResponse}</h5>    
                        <h5>Please Try again</h5>    
                `
                    );
                }

                
            }
            
            async function makeTrendCall(){ 
                let thirdCall = await TrendingGif.getTrendingGif(userPick);
                getTrendGif(thirdCall);
            }

        }

    });


});





