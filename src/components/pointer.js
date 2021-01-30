// import { render } from "react-dom";
// import React, { useState } from "react";
// import useMeasure from "./useMeasure";
// import { useSpring } from "react-spring";

// import { animated } from "react-spring/renderprops-universal";

// export default function Pointer() {
//   const [active, toggle] = useState(false);
//   const [bind, { width }] = useMeasure();
//   const props = useSpring({
//     width: active ? width : 0,
//     backgroundCoElor: active ? "hotpink" : "turqoise",
//     config: { duration: 3000 },
//   });
//   return (
//     <div {...bind} class="main" onClick={() => toggle(!active)}>
//       <animated.div class="fill" style={{ width: props.width }} />
//       <animated.div class="content">
//         {props.width.interpolate((x = Math.floor((x * 100) / width)))}
//       </animated.div>
//     </div>
//   );
// }
