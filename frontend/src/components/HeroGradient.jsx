import React from "react";

function HeroGradient() {
  return (
    <div>
      <div className="shadow-indigoMediumShadow absolute top-0 right-[800px] -z-10 animate-pulse"></div>
      <div className="shadow-indigoMediumShadow absolute top-[10%] left-8 -z-10 animate-pulse"></div>
      <div className="shadow-yellowMediumShadow absolute top-[25%] right-0 -z-10 animate-pulse"></div>
      <div className="shadow-yellowMediumShadow absolute top-[50%] left-8 -z-10 animate-pulse"></div>
    </div>
  );
}

export default HeroGradient;
