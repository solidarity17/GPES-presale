import { Link } from "react-router-dom";
import Layout from "@/layout";

const NoPage = () => {
    return (
        <Layout meta={
            {
                title: "Not found",
                desc: "Not found",
                image: {
                    src: "",
                    width: 0,
                    height: 0
                }
            }
        }>
            <div className='container' style={{maxWidth: 500}}>
                <div className='nopage d column gap-2 center middle' style={{ margin: '0 auto', maxWidth: 700, minHeight: '80vh' }}>
                    <img src="/img/404-page.svg" alt="404-page" style={{ width: '100%', height: 'auto' }} loading='lazy' />
                    <div className="d center middle gap wrap">
                        <div className="lg-text">Sorry! The page not found.</div>
                        <Link to='/' className="lg-text primary-text" style={{ textDecoration: 'underline' }}>Go to Home Page</Link>
                    </div>
                </div>
            </div >
        </Layout>
    )
};

export default NoPage;