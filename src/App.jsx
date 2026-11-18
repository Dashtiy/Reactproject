import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/projects'; // match the exact casing of your file (projects.jsx or Projects.jsx)

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;