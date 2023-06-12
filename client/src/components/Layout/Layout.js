import React from 'react'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Layout({ children, title, description, keywords, author }) {
    return (
        <div>
            <Helmet>
                <meta charSet='utf-s' />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <ToastContainer />
            {children}
        </div>
    )
}

Layout.defaultProps = {
    title: "Dyanavation Electronics",
    description: "Electronics Ecommerce webiste",
    keywords: "mern,react,node,mongodb",
    author: "dynavation electronics"
}

export default Layout
