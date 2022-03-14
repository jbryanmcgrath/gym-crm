import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${process.env.Public_URL + '/images/gym-crm.jpg'})`
  }
}))

export default function () {
  const classes = useStyles()
  return <div className={classes.root}></div>
}