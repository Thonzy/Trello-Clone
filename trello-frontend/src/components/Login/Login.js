import React, { useState, useEffect } from 'react'
import { makeStyles, fade } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import { auth, provider } from "../../utils/Firebase"
import axios from "../../utils/Axios"
import io from 'socket.io-client'

import { useStateValue } from '../../utils/Redux/StateProvider'