import {BrowserRouter as Router} from "react-router-dom";
import Layout from "@/layouts/Layout";
import {Toaster} from "@/components/ui/sonner.tsx";

function App() {
  return (
    <>
      <Router>
        <Layout/>
      </Router>
      <Toaster/>
    </>
  )
}

export default App
