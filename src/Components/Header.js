import React from "react";
import styled from "styled-components";

const Heading = styled.h1`
    color: white;
    width: fit-content;
    padding: 20px;
    margin-right: 150px;
`;



const Header = (props) => {
    return (
        <>
            <Heading>{props.heading}</Heading>
        </>
    );
};

export default Header;