import React, { useEffect, useRef } from "react";
import { findNodeHandle, PixelRatio, UIManager } from "react-native";
import { MyTimer } from "./MyViewManager";

const createFragment = (viewId) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.MyTimer.Commands.create.toString(),
    [viewId]
  );

export const MyView = () => {
  const ref = useRef(null);
   useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  return (
    <MyTimer
      style={{
        height: PixelRatio.getPixelSizeForLayoutSize(200),
        width: PixelRatio.getPixelSizeForLayoutSize(200)
      }}
      ref={ref}
    />
  );
};