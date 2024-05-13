import AppRoute from "./routes/AppRoute";
import styles from "./App.module.css"
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar"
import Footer from "./components/Footer"
import Loading from "./components/Loading";
import LoadingContext from "./context/LoadingContext";
import { useContext } from "react";

function App() {

  const {isLoading} = useContext (LoadingContext);

  return (
    <div className={styles["app"]}>
      <BrowserRouter>
        <header className={styles["app__header"]}>
          <NavigationBar/>
        </header>

        <main className={styles["app__main"]}>
          <AppRoute />
        </main>

        <footer className={styles["app__footer"]}>
          <Footer/>
        </footer>
      </BrowserRouter>

      {isLoading && <Loading/>}
      
    </div>
  );
}

export default App;
