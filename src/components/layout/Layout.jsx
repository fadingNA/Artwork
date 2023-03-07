import {Container} from "react-bootstrap";
import MainNav from "@/components/navbar/MainNav";
import Footer from "@/components/footer/Footer";

const Layout = (props) => {
    return (
        <>
            <MainNav/>
            <br/>
            <Container>
                <br/>
                <br/>
                <br/>
                {props.children}
            </Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Footer/>
        </>
    );
};

export default Layout;
