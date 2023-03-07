import React from "react";

export default function Footer() {
    return (
        <div className="fixed-bottom">
            <footer className="bg-dark text-center text-white">
                <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    © 2023 Copyright:
                    <a className="text-white" href="https://www.linkedin.com/in/nonthachai-plodthong-0882271a4/">fadingNA</a>
                </div>
            </footer>
        </div>
    );
}
