import React from "react";
import {FormControl } from "react-bootstrap";
import styled from "styled-components";

const DarkForm = styled(FormControl)`
    background-color: #9da1a6;
    color: white;
    width: fit-content;
`;

const SearchBar = (props) => {
    return (
        <DarkForm 
        col = "true"
        size= "sm" 
        value = {props.value}
        onChange = {(event) => props.setSearchValue(event.target.value)} 
        placeholder = "Type to Search..."
        
        >

        </DarkForm>
    );
};

export default SearchBar;