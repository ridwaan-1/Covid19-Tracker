import React from "react";
import "../../App.css";
import "./SideSection.css";
import LiveCases from "./LiveCases";

const SideSection = props => {
    return (
        <section className="side-column">
            <div className="card-wrapper livecases-info">
                <h1>Live Cases</h1>
                <div className="table-container">
                    <LiveCases countries={props.countries} />
                </div>
            </div>
        </section>  
    );
}

export default SideSection;