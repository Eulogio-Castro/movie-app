import React, {Component} from "react";


const API_KEY = `aab7b9c8`;
const API_APPEND = `&apikey=${API_KEY}`;


class MovieDetails extends Component{ 
    constructor(){
        super();
        this.state = {
            data : {},
            loading: true,
            error: ''

        }
    }

    async componentDidMount() {
        try{
            const plotURL = `https://www.omdbapi.com/?i=${this.props.movie.imdbID}${API_APPEND}`
            const result = await fetch(plotURL);
            const resultJSON = await result.json();
            
            this.setState({
                data: resultJSON,
                loading : false
            })
        }
        catch(error){
            this.setState({
                loading: false,
                error: error.message,
            });
        }


    }

    render() {
        const {data, loading, error} = this.state;

        if(loading || error) {
            return <div>{loading ?  'Loading...' : error }</div>;
        }
        console.log(data);

        return(
            <>
            <div><p> Runtime: {data.Runtime}</p></div>
            <div><p> Rated {data.Rated}</p></div>
            <div style= {{overflow:"none"}}><p>{data.Plot}</p></div>
            
            </>
        );

    }
    
}

export default MovieDetails;