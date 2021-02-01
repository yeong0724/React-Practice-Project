import React from 'react';
import Responsive from '../components/common/Responsive';
import HeaderContainer from '../containers/common/HeaderContainer';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';
const WritePage = () => {
    return (
        <>
            <HeaderContainer />
            <Responsive>
                <Helmet>
                    <title>POST WRITE</title>
                </Helmet>
                <EditorContainer />
                <TagBoxContainer />
                <WriteActionButtonsContainer />
            </Responsive>
        </>
    );
};

export default WritePage;
