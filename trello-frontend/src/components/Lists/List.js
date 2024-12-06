import React, {useState} from 'react'
import "./Title.css"

import { Paper, CssBaseline } from "@material-ui/core";
import { makeStyle, fade } from "@material-ui/core/styles";

import Title from './Title';
import Card from '../Card/Card';
import InputContainer from '../Input/InputContainer';


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyle(theme => ({
    root: {
        minWidth: '300px',
        backgroundColor: '#EBECF0',
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(1),
    },
    cardContainer: {
        marginTop: theme.spacing(4),
        maxHeight: '70vh',
        overflowY: 'scroll'
    },


}))


const List = ({ list, index }) => {
    const classes = useStyles();

    return (

        <Draggable draggableId={list._id} index={index}>

            {(provided) => (
                <div
                    ref={provided.innerRef} {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <Paper className={classes.root}>
                        <CssBaseline />
                        <Title title={list.title} index={index} />

                        <Droppable droppableId={list._id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef} {...provided.droppableProps}
                                    className={classes.cardContainer}
                                >
                                    {
                                        list.cards && list.cards.map((card, i) => (
                                            <Card key={card._id} card={card} cardIndex={i}
                                            listIndex={index}/>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}

                        </Droppable>


                        <InputContainer listID={list._id} index={index} type={'card'} />
                    </Paper>
                </div>
            )}


        </Draggable>

    )
}

export default List