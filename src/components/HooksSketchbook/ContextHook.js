import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null);

function Content() {
  const { style, visible, toggleStyle, toggleVisible } = useContext(ThemeContext);

  return (
    <div
    style={{
            background: style === 'dark' ? 'black' : 'papayawhip',
            color: style === 'dark' ? 'white' : 'palevioletred',
            width: '100%',
            minHeight: '90px',
            paddingBottom:'20px',
            paddingTop:'1px'
          }}
    >
      <p>
        The theme is <em>{style}</em>
      </p>
      {
        visible && <div>and state of visibility is
        <em> {visible.toString()}</em></div>
      }
      <div>
        <div class="btn" onClick={toggleStyle}>theme</div>
        <div class="btn" onClick={toggleVisible}>visibility</div>
      </div>
    </div>
  );
}

export default function ContextHook() {
  const [style, setStyle] = useState("light");
  const [visible, setVisible] = useState(true);

  function toggleStyle() {
    setStyle(style => (style === "light" ? "dark" : "light"));
  }
  function toggleVisible() {
    setVisible(visible => !visible);
  }

  return (
    <ThemeContext.Provider value={{ style, visible, toggleStyle, toggleVisible }}>
      <h3>context hook</h3>
      <Content/>
    </ThemeContext.Provider>
  );
}
