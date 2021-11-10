import React from "react";

function Footer(props) {
    return (
        <footer 
            className="w-screen p-3 text-center bg-blue-400 fixed bottom-0 text-white text-base"
            >
                A project by <a href="https://github.com/bigsbunny"
                    target="_blank"
                    className="underline" rel="noreferrer">bigsby</a> | © 2021 Bighnesh Sahoo
        </footer>
    )
}

export default Footer;