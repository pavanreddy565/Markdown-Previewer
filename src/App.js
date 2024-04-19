import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';





function App() {
  
  const text=`# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
 

  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  
  `;
  const [md_text,Set_md]=useState(text);
  const [html,Set_html]=useState('');
  useEffect(()=>{
    const markedLib = window.marked;
    const parsedHTML= markedLib.parse(md_text);
    const santizedHTML = DOMPurify.sanitize(parsedHTML,
      {USE_PROFILES: {html: true}});
    Set_html(santizedHTML);
  },[md_text]);
  const handleTextareaChange=(event)=>{
    Set_md(event.target.value);
  }
  
  return (
    
    <>
     <textarea name="editor" id="editor" cols="30" rows="10" value={md_text} onChange={handleTextareaChange} />

      <div id="preview" >
        {parse(html)}

        
      </div>
    </>
  );
}

export default App;
