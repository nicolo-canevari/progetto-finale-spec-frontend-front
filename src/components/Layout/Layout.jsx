import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css'


// Componente Layout: avvolge tutte le pagine dell'app per fornire una struttura comune
export default function Layout({ children }) {

    return (

        <>

            <div className="layout-wrapper">

                {/* Navbar visibile in alto in tutte le pagine */}
                <Navbar />

                {/* Contenuto principale della pagina viene iniettato qui tramite children */}
                <div className="layout-content">
                    {children}
                </div>

                {/* Footer visibile in basso in tutte le pagine */}
                <Footer />

            </div>

        </>

    );

}
