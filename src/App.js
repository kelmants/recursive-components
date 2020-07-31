import "bootstrap/dist/css/bootstrap.css";
import "./styles.scss";
import React from "react";
import axios from "axios";

const Folder = ({ name = "", files, position }) => {
  const [show, setShow] = React.useState(false);
  const handle = React.useCallback(position => {
    return setShow(prev => !prev);
  }, []);
  return (
    <ul className="list-group list-group-flush">
      {name && `Folder - ${name}`}
      {files &&
        files.map((el, position) => {
          return (
            <>
              <span className="folder" onClick={handle}>
                Sub folder
              </span>
              {
                <li
                  className={
                    show
                      ? "list-group-item gio-list active"
                      : "list-group-item gio-list hide"
                  }
                  key={`${el.name}-${position}`}
                >
                  <Folder {...el} position={position} />
                </li>
              }
            </>
          );
        })}
    </ul>
  );
};

export default function App() {
  const [data, setData] = React.useState([]);

  React.useLayoutEffect(() => {
    axios
      .get("https://run.mocky.io/v3/c22a2d75-a927-4e9b-bbc5-6ac10aa15a26")
      .then(({ data }) => setData(data));
  }, []);

  const handleClick = event => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Folder files={data} onCLick={handleClick} />
    </div>
  );
}
