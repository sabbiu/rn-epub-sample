import React, { Component } from 'react';
import { Epub, Streamer } from 'epubjs-rn';
import RNFS from 'react-native-fs';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      src: null,
      // src: "https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf"
    })
  }
  
  componentDidMount() {
    let dir = `${RNFS.DocumentDirectoryPath}/www`;
    console.log(dir)
    RNFS.exists(dir)
      .then( exist => console.log('yo yo ', exist))
    let streamer = new Streamer();


    // RNFS.mkdir(dir)
      // .then(() => {
        streamer.start("8899")
          .then((origin) => {
            console.log("Served from:", origin)
            streamer.get("https://s3.amazonaws.com/epubjs/books/moby-dick.epub")
              .then((src) => {
                console.log("Loading from:", src);
                return this.setState({src});
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      // })
    
    
      
  }
  render() {
    return (
      <Epub
        src={this.state.src}
        flow={'paginated'}
        onPress={(cfi, rendition)=> {
          console.log("press", cfi, rendition);
        }}
      />
    );
  }
}
