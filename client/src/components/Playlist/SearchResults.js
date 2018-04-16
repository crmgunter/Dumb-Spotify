import React, { Component } from 'react';

class SearchResults extends Component {
    render() {
        return (
            <div>
                <h1>results:</h1>
                {/* {console.log(this.props.results.artists.items)}
                {this.props.results.artists.items.map((artist) => (
                    <div>
                        {artist.name}
                    </div>
                ))} */}
                {console.log(this.props.results.tracks.items)}
                {this.props.results.tracks.items.map((track) => (
                    <div>
                        <div>{track.name}</div>
                        <div>{track.artists[0].name}</div>
                        <div>{track.album.name}</div>
                        <img src={track.album.images[0].url} />
                    </div>
                ))}
            </div>
        );
    }
}

export default SearchResults;