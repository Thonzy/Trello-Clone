import React, { useState, useContext } from 'react'
import { Paper, InputBase, Typography } from "@material-ui/core";
import { makeStyle, fade } from "@material-ui/core/styles";

import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import StoredAPI from "../../utils/StoredApi";