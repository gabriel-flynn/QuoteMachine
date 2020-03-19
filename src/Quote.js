import React from 'react'

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            quote: '',
            imageURL: '',
            direction: '',
            isLoaded: false
        }
    }
    //Fetches new quotes
    generateNewQuote() {
      fetch("https://thesimpsonsquoteapi.glitch.me/quotes")
          .then(res => res.json())
          .then(
            (result) => {
              result = result[0]
                this.setState({
                isLoaded: true,
                author: result.character,
                quote: result.quote,
                imageURL: result.image,
                direction: result.characterDirection
              });
            },
            (error) => {
              console.log(error)
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    componentDidMount() {
        this.generateNewQuote();
      }

      render() {
        const { error, isLoaded, author, quote, imageURL, direction } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          /*Gets the image and quote text so we can display them in the direction
           the character is facing
           */
          const image =(
                  <div className="col-sm-3">
                      <img className="img-fluid" style={{width: "100%", maxHeight: "300px"}} src={imageURL}/>
                  </div>)
          const quoteText = (
                  <div className="col-sm-9">
                      <p id="text">{this.state.quote}</p>
                      <footer id="author" className="blockquote-footer">{author} from <cite title="Source Title">The Simpsons</cite></footer>
                      <button id="new-quote" className="mt-1 btn btn-success" onClick={this.generateNewQuote.bind(this)}>Generate New Quote</button>
                      <a href={`https://twitter.com/intent/tweet?text="${quote}" by ${author} from The Simpsons`} title="Twitter" className="ml-2 mt-1 btn btn-primary"><i className="fab fa-twitter"></i> Tweet</a>
                  </div>)

          return (
            <div id="quote-box" className="card mt-5 container" style={{border: "2px solid black", height: "100%"}}>
              <div className="row">
                <div className="card-header text-center" style={{width: "100%",borderBottom: "2px solid black"}}>
                  Random Quote Machine
                </div>
              </div>
              
              <div className="card-body">
                <blockquote className="blockquote mb-0 row">
                  {/*
                    Figure out which direction the character is facing
                    and render accordingly
                  */}
                  {
                   direction === 'Left' ? image : quoteText
                  }
                  {
                    direction === 'Left' ? quoteText : image
                  }
                  
                  
                </blockquote>
              </div>
            </div>
          );
        }
      }
}

export default Quote;