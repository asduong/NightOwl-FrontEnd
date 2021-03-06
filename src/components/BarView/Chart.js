import React from "react";

import PieChart from "react-minimal-pie-chart";

const pieStyle = {
  position: "fixed",
  right: "-80px",
  bottom: "150px",
  width: "375px"
};

class Chart extends React.Component {
  getGenderCount = array => {
    let females = [];
    let males = [];
    if (array !== undefined) {
      males = array.filter(elem => {
        if (elem.gender === "Male") {
          return elem;
        }
      });
      females = array.filter(elem => {
        if (elem.gender === "Female") {
          return elem;
        }
      });
    }
    return [males.length, females.length];
  };
  render() {
    let genders = this.getGenderCount(this.props.currentVisits);
    return (
      <div className="chart">
        <PieChart
          style={pieStyle}
          radius={25}
          label={({ data, dataIndex }) =>
            Math.round(data[dataIndex].percentage) +
            "%   " +
            data[dataIndex].title
          }
          labelPosition={55}
          lengthAngle={360}
          lineWidth={100}
          labelStyle={{
            fill: "#f3f3f3",
            fontFamily: "sans-serif",
            fontSize: "4px"
          }}
          ratio={1.2}
          data={[
            { title: "Females", value: genders[0], color: "#F17CB0" },
            { title: "Males", value: genders[1], color: "#5DA5DA" }
          ]}
        />
      </div>
    );
  }
}
export default Chart;
