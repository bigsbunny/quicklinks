import React from "react";

function Footer(props) {
    return (
        <footer
            className="w-screen p-3 text-center bg-blue-400 fixed bottom-0 text-white text-base"
        >
            A project by <a href="https://github.com/bigsbunny"
                target="_blank"
                className="underline" rel="noreferrer">bigsby</a> | © 2021 Bighnesh Sahoo

            <iframe src="https://ghbtns.com/github-btn.html?user=bigsbunny&repo=quicklinks&type=star&count=true" 
                    frameborder="0" scrolling="0" 
                    width="100" height="20" 
                    title="GitHub"
                    className="inline absolute right-0"></iframe>
        </footer>
    )
}

export default Footer;