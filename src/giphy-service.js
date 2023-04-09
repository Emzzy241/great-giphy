// business Logic file

// in this version of the application, I would be using one of the most recent Technologies for making my API calls: the Async and Await functions

// class for searching giphy based on user's input
export class SearchGiphyService {

    // the static method is just a method that returns a promise object, and we are returning a promise object because we did not store the promise in a variable just like we did before
    static async getSearchedGif(userGif) {
        // using the return keyword for returning our promise so our function is not undefined


        // storing the fetched response in a variable and awaiting it
        try {

            let myAwaitedGifResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${userGif}&limit=1&offset=0&rating=g&lang=en`)
            // wrapping the code in a try.... catch block

            // running the same branch again. the branch that determines if my response has an "ok" property
            if (!myAwaitedGifResponse.ok) {
                throw Error(myAwaitedGifResponse.statusText);
            }
            // if there is an "ok" property, return it to me with the .json() method called on it
            return myAwaitedGifResponse.json();

        } catch (giphyError) {
            // returning a property named message that will always be in giphyError parameter 
            return giphyError.message;
        }
        // the catch block is where I handle the error I threw above in the if statement
    }

}

// a class for implementing random gifs for users

export class RandomGif {

    // a static method running the random API call
    // the static method is just a method that returns a promise object, and we are returning a promise object because we did not store the promise in a variable just like we did before

    static async getRandomGif() {

        try {
            // fetching giphy's random endpoint(an endpoint is just like a url used for api calls)
            let myAwaitedRandomResponse = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`)

            if (!myAwaitedRandomResponse.ok) {
                throw Error(myAwaitedRandomResponse.statusText);
            }
            return myAwaitedRandomResponse.json();

        } catch (giphyRandomError) {
            return giphyRandomError.message;
        }

    }
}


// a class for implementing trending gifs for users

export class TrendingGif {

    // a static method for running the trending gif API call

    static async getTrendingGif() {

        // using the try...catch block just to know if we got the data or the Error

        try {

            // fetching a giphy trend endpoint url for users

            let myAwaitedTrendReponse = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&tag=&rating=g`)

            if (!myAwaitedTrendReponse.ok) {
                throw Error(myAwaitedTrendReponse.statusText);
            }
            return myAwaitedTrendReponse.json();
        }

        catch (giphyTrendError) {
            return giphyTrendError.message;
        }

    }


}