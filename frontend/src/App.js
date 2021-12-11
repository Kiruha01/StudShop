import {BrowserRouter} from "react-router-dom";
import AnotherApp from "./AnotherApp";

function App() {

  return (
      <div>
              <BrowserRouter>
                    <AnotherApp/>
              </BrowserRouter>

      </div>
  );
}

export default App;
