import React, { useEffect, useRef } from "react";

import "./App.css";
import ballRow from "./data";

function App() {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const myScene = sceneRef.current;
    const myCamera = cameraRef.current;

    function getDirection(camera, speed) {
      var y = camera.getAttribute("rotation").y + 90;
      var x = camera.getAttribute("rotation").x;

      var moveX = Math.cos((y / 360) * (Math.PI * 2));
      var moveY = Math.sin((x / 360) * (Math.PI * 2));
      var moveZ = Math.sin((y / 360) * (Math.PI * 2));
      var moveXRatio =
        Math.pow(moveX, 2) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));
      var moveZRatio =
        Math.pow(moveZ, 2) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));

      if (moveX <= 0) {
        moveX = -Math.sqrt((1 - Math.pow(moveY, 2)) * moveXRatio);
      } else {
        moveX = Math.sqrt((1 - Math.pow(moveY, 2)) * moveXRatio);
      }

      if (moveZ <= 0) {
        moveZ = -Math.sqrt((1 - Math.pow(moveY, 2)) * moveZRatio);
      } else {
        moveZ = Math.sqrt((1 - Math.pow(moveY, 2)) * moveZRatio);
      }

      return { x: moveX * speed, y: moveY * speed, z: -moveZ * speed };
    }
    const shoot = () => {
      const bullet = document.createElement("a-sphere");
      let pos = myCamera.getAttribute("position");
      bullet.setAttribute("position", pos);
      bullet.setAttribute("velocity", getDirection(myCamera, 30));
      bullet.setAttribute("dynamic-body", true);
      bullet.setAttribute("radius", 0.5);
      bullet.setAttribute("color", "lime");
      myScene.appendChild(bullet);
    };

    document.onkeydown = (event) => {
      if (event.code === "Space") {
        shoot();
      }
    };
  }, [sceneRef, cameraRef]);

  return (
    <a-scene ref={sceneRef} environment="preset:default;">
      <a-camera ref={cameraRef} position="0 2 0">
        <a-cursor intersection-spawn="Event: click; mixin:voxel;"></a-cursor>
      </a-camera>

      <a-entity class="shooter-box">
        <a-box
          static-body
          position="0 0.5 -7"
          width="9"
          rotation="0 0 0"
          color="#4CC3D9"
        ></a-box>
        {ballRow.map((ball) => (
          <a-sphere
            dynamic-body
            position={ball.position}
            radius={ball.radius}
            color={ball.color}
          ></a-sphere>
        ))}
      </a-entity>
      <a-entity class="shooter-box" position="-10 0 0" rotation="0 45 0">
        <a-box
          static-body
          position="0 0.5 -7"
          width="9"
          rotation="0 0 0"
          color="#4CC3D9"
        ></a-box>
        {ballRow.map((ball) => (
          <a-sphere
            dynamic-body
            position={ball.position}
            radius={ball.radius}
            color={ball.color}
          ></a-sphere>
        ))}
      </a-entity>
      <a-entity class="shooter-box" position="10 0 0" rotation="0 -45 0">
        <a-box
          static-body
          position="0 0.5 -7"
          width="9"
          rotation="0 0 0"
          color="#4CC3D9"
        ></a-box>
        {ballRow.map((ball) => (
          <a-sphere
            dynamic-body
            position={ball.position}
            radius={ball.radius}
            color={ball.color}
          ></a-sphere>
        ))}
      </a-entity>
      <a-sky color="lightblue"></a-sky>
      <a-plane
        position="0 0 -4"
        rotation="-90 0 0"
        width="4"
        height="4"
        color="#7BC8A4"
      ></a-plane>
    </a-scene>
  );
}

export default App;
