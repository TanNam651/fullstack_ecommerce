// import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@fortawesome/fontawesome-free/css/all.min.css';


import store from "@/reducers/index";
import {Provider} from "react-redux";
import Main from "./Main.tsx";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/*<StrictMode>*/}
    <Main>
      <App/>
    </Main>
    {/*</StrictMode>*/}
  </Provider>
)
