import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ArgumentScale, Animation } from "@devexpress/dx-react-chart";
import { curveCatmullRom, line } from "d3-shape";
import { scalePoint } from "d3-scale";

import { memberActivity as data } from "../graph-data/data-visualization";

// const PREFIX = 'Demo';

const classes = {
  title: "Member Activity At Your Gym",
  chart: "Members Activity Going to Gym Vs. Held Memberships",
};

const Line = (props) => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ arg }) => arg)
      .y(({ val }) => val)
      .curve(curveCatmullRom)}
  />
);

const StyledDiv = styled("div")(() => ({
  [`&.${classes.title}`]: {
    textAlign: "center",
    width: "100%",
    marginBottom: "10px",
  },
}));

const Text = ({ text }) => {
  const [mainText, subText] = text.split("\\n");
  return (
    <StyledDiv className={classes.title}>
      <Typography component="h3" variant="h5">
        {mainText}
      </Typography>
      <Typography variant="subtitle1">{subText}</Typography>
    </StyledDiv>
  );
};

const Root = (props) => (
  <Legend.Root
    {...props}
    sx={{ display: "flex", margin: "auto", flexDirection: "row" }}
  />
);
const Label = (props) => (
  <Legend.Label {...props} sx={{ mb: 1, whiteSpace: "nowrap" }} />
);
const Item = (props) => (
  <Legend.Item {...props} sx={{ flexDirection: "column-reverse" }} />
);

const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: "30px",
  },
}));

export default class MemberGraph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper style={{ marginLeft: "150px", marginRight: "15px" }}>
        <StyledChart
          style={{ marginRight: "10px" }}
          data={chartData}
          className={classes.chart}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries
            name="Members Actively Going to Gym"
            valueField="membersActiveAtGym"
            argumentField="month"
            seriesComponent={Line}
          />
          <LineSeries
            name="Memberships to Gym"
            valueField="gymMemberships"
            argumentField="month"
            seriesComponent={Line}
          />

          <Legend
            position="bottom"
            rootComponent={Root}
            itemComponent={Item}
            labelComponent={Label}
          />
          <Title text="Gym Member Activity in 2021\n" textComponent={Text} />
          <Animation />
        </StyledChart>
      </Paper>
    );
  }
}
